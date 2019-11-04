import React, {Component, Fragment, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import classNames from "classnames";
import Blockies from "react-blockies";
import {Redirect} from "react-router-dom";

import {NetworkLabelMap, NetworkTypes, SearchResultTypes} from "../../Common/constants";

import {projectActions, searchActions, contractActions} from "../../Core/actions";

import {Icon, Panel, Card, PanelContent, List, ListItem, Tag, PanelHeader, Button, Input} from "../../Elements";
import {SimpleLoader, NetworkTag} from "..";

import './AddPublicContractForm.scss';

/**
 * @param {SearchResult[]} searchResults
 * @param {Function} onSelect
 * @param {Contract[]} [existingContracts]
 * @param selectedContracts
 * @constructor
 */
const SearchResultsByNetwork = ({searchResults, onSelect, existingContracts, selectedContracts}) => {
    const groupedResults = _.groupBy(searchResults, 'network');

    const networks = _.sortBy(Object.keys(groupedResults), network => Object.values(NetworkTypes).indexOf(network));

    const [currentNetwork, changeSelectedNetwork] = useState(networks[0]);

    return (
        <div className="SearchResultsByNetwork">
            <div className="SearchResultsByNetwork__NetworkPicker">
                {networks.map(networkKey => <div key={networkKey} onClick={() => changeSelectedNetwork(networkKey)} className={classNames(
                    "SearchResultsByNetwork__Network",
                    {
                        "SearchResultsByNetwork__Network--Active": networkKey === currentNetwork,
                    },
                )}>
                    {NetworkLabelMap[networkKey]}
                    <Tag size="small" color="primary-outline" className="MarginLeft1">{groupedResults[networkKey].length}</Tag>
                </div>)}
            </div>
            <div className="SearchResultsByNetwork__Results">
                {groupedResults[currentNetwork].map(searchResult => {
                    const isSelected = selectedContracts.find(sc => sc.value === searchResult.value);
                    const isAlreadyAdded = existingContracts.find(c => c.id === searchResult.value);

                    return <div key={searchResult.value} onClick={() => onSelect(searchResult)} className={classNames(
                        "SearchResultsByNetwork__Result",
                        {
                            "SearchResultsByNetwork__Result--Selected": isSelected,
                            "SearchResultsByNetwork__Result--Disabled": isAlreadyAdded,
                        }
                    )}>
                        <div className="SearchResultsByNetwork__Result__Checkbox">
                            {(isAlreadyAdded || isSelected) && <Icon icon="check"/>}
                        </div>
                        <div>
                            <div className="SemiBoldText SearchResultsByNetwork__Result__Label">
                                <span>{searchResult.label}</span>
                                {isAlreadyAdded && <span className="MarginLeft1 SearchResultsByNetwork__Result__AlreadyAdded">Already added to this project</span>}
                            </div>
                            <div className="MonospaceFont LinkText">{searchResult.hex}</div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
};

class AddPublicContractForm extends Component {
    state = {
        searchQuery: '',
        searchResults: [],
        searching: false,
        isTyping: false,
        selectedContracts: [],
        selectedContractsStatus: {},
        redirectBack: false,
        importInProgress: false,
    };

    handleQueryUpdate = (field, value) => {
        this.setState({
            [field]: value,
            isTyping: true,
        });


        this.debouncedSearch(value);
    };

    debouncedSearch = _.debounce(async (query) => {
        const {searchActions} = this.props;

        if (!query) return;

        const searchResponse = await searchActions.getSearchResults(query);

        this.setState({searching: true});

        if (searchResponse.success) {
            const publicContracts = searchResponse.data.find(searchGroup => searchGroup.value === SearchResultTypes.PUBLIC_CONTRACT);

            this.setState({
                searching: false,
                isTyping: false,
                searchResults: publicContracts ? publicContracts.options : [],
            });
        } else {
            this.setState({
                searching: false,
                isTyping: false,
            });
        }
    }, 1000);

    /**
     * @param {SearchResult} searchResult
     */
    handleContractSelection = (searchResult) => {
        const {selectedContracts} = this.state;

        const existing = selectedContracts.find(sc => sc.value === searchResult.value);

        if (existing) {
            this.setState({
                selectedContracts: _.without(selectedContracts, existing),
            });
        } else {
            this.setState({
                selectedContracts: [
                    ...selectedContracts,
                    searchResult,
                ],
            });
        }
    };

    /**
     * @param {Project} project
     * @param {SearchResult} searchResult
     * @returns {Promise<void>}
     */
    importContractToProject = async (project, searchResult) => {
        const {selectedContractsStatus} = this.state;
        const {projectActions} = this.props;

        this.setState({
            selectedContractsStatus: {
                ...selectedContractsStatus,
                [searchResult.value]: 'importing',
            },
        });

        const response = await projectActions.addVerifiedContractToProject(project, searchResult.network, searchResult.hex);

        let finalStatus = 'success';

        if (!response.success) {
            finalStatus = 'failed';
        }

        this.setState({
            selectedContractsStatus: {
                ...selectedContractsStatus,
                [searchResult.value]: finalStatus,
            },
        });

        return response.success;
    };

    importSelectedContractsToProject = async () => {
        const {project, contractActions} = this.props;
        const {selectedContracts} = this.state;

        let allSuccessful = true;

        this.setState({
            importInProgress: true,
        });

        // For some reason eslint says that searchResult is not used
        // eslint-disable-next-line
        for (const searchResult of selectedContracts) {
            const addedSuccessfully = await this.importContractToProject(project, searchResult);

            if (!addedSuccessfully) {
                allSuccessful = false;
            }
        }

        await contractActions.fetchContractsForProject(project);

        this.setState({
            redirectBack: allSuccessful,
            importInProgress: false,
        });
    };

    render() {
        const {searchQuery, searchResults, searching, isTyping, selectedContracts, importInProgress, redirectBack, selectedContractsStatus} = this.state;
        const {project, contracts} = this.props;

        if (redirectBack) {
            return <Redirect to={`${project.getUrlBase()}/contracts`}/>
        }

        return (
            <Panel className="AddPublicContractForm">
                <PanelHeader>
                    <h3>Import Public Contracts</h3>
                </PanelHeader>
                <PanelContent>
                    <p className="MarginBottom3">You can import contracts that have been verified publicly on either Etherscan or Tenderly to the project.</p>
                    {!importInProgress && <Fragment>
                        <Input icon="search" label="Find a public contract by name or address" field="searchQuery" value={searchQuery} disabled={searching} onChange={this.handleQueryUpdate}/>
                        {!!searchQuery && <Card color="dark" noPadding className="AddPublicContractForm__SearchQueryResults">
                            {isTyping && <div className="Flex1 DisplayFlex AlignItemsCenter JustifyContentCenter">
                                <SimpleLoader/>
                            </div>}
                            {!isTyping && searchResults.length === 0 && <div className="Flex1 DisplayFlex AlignItemsCenter JustifyContentCenter">
                                <span>No contracts found that match this query</span>
                            </div>}
                            {!isTyping && searchResults.length > 0 && <SearchResultsByNetwork searchResults={searchResults} onSelect={this.handleContractSelection} existingContracts={contracts} selectedContracts={selectedContracts}/>}
                        </Card>}
                    </Fragment>}
                    {selectedContracts.length > 0 && <List className="MarginBottom3">
                        {selectedContracts.map(selectedContract => <ListItem key={selectedContract.value} className="DisplayFlex AlignItemsCenter Padding1">
                            <div className="MarginRight2 AddPublicContractForm__SelectedContractImage">
                                <Blockies size={8} scale={5} className="BorderRadius1" seed={selectedContract.value}/>
                                {selectedContractsStatus[selectedContract.value] && <div className={`AddPublicContractForm__SelectedContractImage__InProgress AddPublicContractForm__SelectedContractImage__InProgress--${selectedContractsStatus[selectedContract.value]}`}>
                                    {selectedContractsStatus[selectedContract.value] === 'importing' && <SimpleLoader inverse/>}
                                    {selectedContractsStatus[selectedContract.value] === 'success' && <Icon icon="check"/>}
                                    {selectedContractsStatus[selectedContract.value] === 'failed' && <Icon icon="x-circle"/>}
                                </div>}
                            </div>
                            <div className="MarginRight2 Flex1">
                                <div className="SemiBoldText">{selectedContract.label}</div>
                                <div className="MarginTop1">
                                    <NetworkTag size="small" network={selectedContract.network}/>
                                    <span className="MarginLeft1 MonospaceFont LinkText">{selectedContract.hex}</span>
                                </div>
                            </div>
                            {!importInProgress && <div onClick={() => this.handleContractSelection(selectedContract)} className="Padding1 CursorPointer LinkText">
                                <Icon icon="x" className="MarginRight1"/>
                                <span>Remove</span>
                            </div>}
                        </ListItem>)}
                    </List>}
                    <div>
                        <Button disabled={selectedContracts.length === 0 || searching || importInProgress} onClick={this.importSelectedContractsToProject}>
                            <span>Import Contracts</span>
                        </Button>
                    </div>
                </PanelContent>
            </Panel>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        projectActions: bindActionCreators(projectActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
        searchActions: bindActionCreators(searchActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddPublicContractForm);
