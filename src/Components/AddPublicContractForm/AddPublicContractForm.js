import React, {Component, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import classNames from "classnames";
import Blockies from "react-blockies";

import {NetworkLabelMap, NetworkTypes, SearchResultTypes} from "../../Common/constants";

import {areProjectContractsLoaded, getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {projectActions, searchActions} from "../../Core/actions";

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
                    const isSelected = selectedContracts.find(sc => sc.data.value === searchResult.value);
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

        const existing = selectedContracts.find(sc => sc.data.value === searchResult.value);

        if (existing) {
            this.setState({
                selectedContracts: _.without(selectedContracts, existing),
            });
        } else {
            this.setState({
                selectedContracts: [
                    ...selectedContracts,
                    {
                        data: searchResult,
                        status: 'selected',
                    },
                ]
            });
        }
    };

    render() {
        const {searchQuery, searchResults, searching, isTyping, selectedContracts} = this.state;
        const {contracts} = this.props;

        return (
            <Panel className="AddPublicContractForm">
                <PanelHeader>
                    <h3>Import Public Contracts</h3>
                </PanelHeader>
                <PanelContent>
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
                    {selectedContracts.length > 0 && <List className="MarginBottom3">
                        {selectedContracts.map(selectedContract => <ListItem key={selectedContract.data.value} className="DisplayFlex AlignItemsCenter">
                            <Blockies size={8} scale={5} className="BorderRadius1 MarginRight2" seed={selectedContract.data.value}/>
                            <div className="MarginRight2 Flex1">
                                <div className="SemiBoldText">{selectedContract.data.label}</div>
                                <div className="MarginTop1">
                                    <NetworkTag size="small" network={selectedContract.data.network}/>
                                    <span className="MarginLeft1 MonospaceFont LinkText">{selectedContract.data.hex}</span>
                                </div>
                            </div>
                            <div onClick={() => this.handleContractSelection(selectedContract.data)} className="Padding1 SemiBoldText CursorPointer DangerText">Remove</div>
                        </ListItem>)}
                    </List>}
                    <div>
                        <Button disabled={selectedContracts.length === 0 || searching}>
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
        searchActions: bindActionCreators(searchActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddPublicContractForm);
