import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {components} from 'react-select';
import AsyncSelect from 'react-select/async';
import * as _ from "lodash";
import Blockies from "react-blockies";

import Analytics from "../../Utils/Analytics";

import {searchActions} from "../../Core/actions";

import {Icon} from '../../Elements';
import {SimpleLoader, NetworkTag} from "..";

import './PublicNetworksSearch.scss';
import {generateShortAddress} from "../../Utils/AddressFormatter";

function SearchResultsNoOptionsMessage(props) {
    const {query} = props;

    return <div className="SearchResultsNoOptionsMessage">
        {!query && <div className="SearchResultsNoOptionsMessage__Wrapper">
            <h4 className="SearchResultsNoOptionsMessage__Title">Find the contract/transaction you wish to inspect</h4>
            <p className="SearchResultsNoOptionsMessage__Description">Note that we currently only parse contracts and transactions that have been verified on <span className="SemiBoldText">Tenderly</span> or <span className="SemiBoldText">Etherscan</span></p>
        </div>}
        {!!query && query.length < 3 && <div className="SearchResultsNoOptionsMessage__Wrapper">
            <h4 className="SearchResultsNoOptionsMessage__Title">At least 3 characters are required for the search</h4>
        </div>}
        {!!query && query.length >= 3 && <div className="SearchResultsNoOptionsMessage__Wrapper">
            <h4 className="SearchResultsNoOptionsMessage__Title">No results found</h4>
            <p className="SearchResultsNoOptionsMessage__Description">It seems that we didn't find the contract/transaction your were looking for. We currently only parse contracts and transactions that have been verified on Tenderly or Etherscan.</p>
            <p className="SearchResultsNoOptionsMessage__Description">If you wish to monitor and inspect private contracts and transactions in your project you can do so in one of the following ways:</p>
            <div className="SearchResultsNoOptionsMessage__Actions">
                <a className="SearchResultsNoOptionsMessage__ActionLink" href="https://blog.tenderly.dev/a-tenderly-update-debugging-ethereum-transactions-verifying-contracts-and-other-newsworthy-updates/" target="_blank" rel="noopener noreferrer">
                    <Icon className="SearchResultsNoOptionsMessage__ActionLink__Icon" icon="arrow-right"/>
                    <h4>Verifying your contracts on Tenderly</h4>
                </a>
            </div>
        </div>}
    </div>
}

function SearchBarLoadingIndicator(props) {
    return <components.LoadingIndicator {...props}>
        <SimpleLoader/>
    </components.LoadingIndicator>;
}

function SearchBarDropdownIndicator(props) {
    return <components.DropdownIndicator {...props}>
        <Icon icon="search" className="SearchBarDropdownIndicator__Icon"/>
    </components.DropdownIndicator>;
}

function SearchResultSelectOption(props) {
    /** @type {SearchResult} */
    const data = props.data;

    const projectInfo = data.getProjectInfo();

    return (
        <components.Option {...props} className="AppSearchSelectOption">
            <Blockies size={8} scale={5} className="BorderRadius1" seed={data.value}/>
            <div className="MarginLeft2">
                <div className="MarginBottom1">
                    <span className="SemiBoldText">{data.label}</span>
                    {!!projectInfo && <span className="MarginLeft1 MutedText">{projectInfo.username}/{projectInfo.slug}</span>}
                </div>
                <div>
                    <span className="MonospaceFont LinkText">{generateShortAddress(data.hex, 12, 6)}</span>
                </div>
            </div>
            <div className="MarginLeftAuto">
                <NetworkTag size="small" network={data.network}/>
            </div>
        </components.Option>
    );
}

class PublicNetworksSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
        }
    }

    debouncedSearch = _.debounce(async (query, callback) => {
        const {searchActions} = this.props;

        if (!callback) return;

        const searchResponse = await searchActions.getSearchResults(query);

        Analytics.trackEvent('explore_page_search');

        if (searchResponse.success) {
            callback(searchResponse.data)
        } else {
            callback([]);
        }
    }, 1000);

    fetchSearchResults = (query, callback) => {
        this.debouncedSearch(query, callback);
    };

    /**
     * @param {SearchResult} searchResult
     */
    handleSearchSelect = (searchResult) => {
        const {history, searchActions} = this.props;

        searchActions.registerSearchResultSelected(searchResult);

        Analytics.trackEvent('explore_page_search_selected');

        history.push(searchResult.getUrl());
    };

    handleInputChange = (value) => {
        this.setState({
            searchQuery: value,
        })
    };

    render() {
        const {searchQuery} = this.state;

        return (
            <div className="PublicNetworksSearch">
                <div className="PublicNetworksSearch__InputWrapper">
                    <div className="Select PublicSearchInput">
                        <AsyncSelect classNamePrefix="Select" onInputChange={this.handleInputChange} onChange={this.handleSearchSelect} components={{
                            Option: SearchResultSelectOption,
                            NoOptionsMessage: (props) => <SearchResultsNoOptionsMessage {...props} query={searchQuery}/>,
                            IndicatorSeparator: () => null,
                            DropdownIndicator: SearchBarDropdownIndicator,
                            LoadingIndicator: SearchBarLoadingIndicator,
                        }} loadOptions={this.fetchSearchResults} isLoading={true} placeholder="Search for transactions or Smart Contracts"/>
                        <div className="PublicNetworksSearch__SupportedNetworks"><span className="MutedText">Supported Networks:</span> Mainnet, Kovan, Rinkeby, Ropsten, Görli</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchActions: bindActionCreators(searchActions, dispatch),
    }
};

export default withRouter(connect(
    null,
    mapDispatchToProps,
)(PublicNetworksSearch));
