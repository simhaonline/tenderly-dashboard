import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {components} from 'react-select';
import AsyncSelect from 'react-select/async';

import Analytics from "../../Utils/Analytics";

import {NetworkAppToRouteTypeMap} from "../../Common/constants";

import * as publicActions from "../../Core/PublicContracts/PublicContracts.actions";

import {Icon} from '../../Elements';
import {ContractSelectOption, TransactionSelectOption, SimpleLoader} from "../index";

import './PublicNetworksSearch.scss';
import * as _ from "lodash";

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
            <p className="SearchResultsNoOptionsMessage__Description">But no worries, if you wish to monitor and inspect private contracts and transactions in your project you can do so in one of the following ways:</p>
            <div className="SearchResultsNoOptionsMessage__Actions">
                <a className="SearchResultsNoOptionsMessage__ActionLink" href="">
                    <Icon className="SearchResultsNoOptionsMessage__ActionLink__Icon" icon="arrow-right"/>
                    <h4>Upload to project via our CLI</h4>
                </a>
                <a className="SearchResultsNoOptionsMessage__ActionLink" href="https://medium.com/tenderly/a-tenderly-update-debugging-ethereum-transactions-verifying-contracts-and-other-newsworthy-4d7f20317f92#75c6" target="_blank">
                    <Icon className="SearchResultsNoOptionsMessage__ActionLink__Icon" icon="arrow-right"/>
                    <h4>Verify your contracts on Tenderly</h4>
                </a>
            </div>
        </div>}
    </div>
}

function SearchBarDropdownIndicator(props) {
    return <components.DropdownIndicator {...props}>
        <Icon icon="search" className="SearchBarDropdownIndicator__Icon"/>
    </components.DropdownIndicator>;
}

function SearchResultSelectOption(props) {
    const data = props.data;

    if (data.type === 'contract') {
        return <ContractSelectOption {...props}/>
    }

    return <TransactionSelectOption {...props}/>
}

class PublicNetworksSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            result: null,
        }
    }

    debouncedSearch = _.debounce(async (query, callback) => {
        const {publicActions} = this.props;

        if (!callback) return;

        const searchResponse = await publicActions.searchPublicData(query);

        Analytics.trackEvent('explore_page_search');

        if (searchResponse.success) {
            const data = [];

            if (searchResponse.data.contracts) {
                data.push({
                    label: 'Contracts',
                    value: 'contracts',
                    options: searchResponse.data.contracts,
                })
            }

            if (searchResponse.data.transactions) {
                data.push({
                    label: 'Transactions',
                    value: 'transactions',
                    options: searchResponse.data.transactions,
                })
            }

            callback(data)
        } else {
            callback([]);
        }


        this.setState({
            searchPromise: null,
            promiseResolver: null,
        });
    }, 1000);

    fetchSearchResults = (query, callback) => {
        this.debouncedSearch(query, callback);
    };

    goTo = (type, network, suffix) => {
        const {history} = this.props;

        const networkRoute = NetworkAppToRouteTypeMap[network];

        history.push(`/${type}/${networkRoute}/${suffix}`);
    };

    handleSearchSelect = (option) => {
        Analytics.trackEvent('explore_page_search_selected');

        if (option.type === 'contract') {
            this.goTo('contract', option.network, option.address);
        } else if (option.type === 'transaction') {
            this.goTo('tx', option.network, option.txHash);
        }
    };

    handleInputChange = (value) => {
        this.setState({
            searchQuery: value,
        })
    };

    render() {
        const {loading, result, searchQuery} = this.state;

        return (
            <div className="PublicNetworksSearch">
                <div className="PublicNetworksSearch__InputWrapper">
                    <div className="Select PublicSearchInput">
                        <AsyncSelect classNamePrefix="Select" onInputChange={this.handleInputChange} onChange={this.handleSearchSelect} components={{
                            Option: SearchResultSelectOption,
                            NoOptionsMessage: (props) => <SearchResultsNoOptionsMessage {...props} query={searchQuery}/>,
                            IndicatorSeparator: () => null,
                            DropdownIndicator: SearchBarDropdownIndicator,
                        }} menuIsOpen loadOptions={this.fetchSearchResults} placeholder="Search by tx hash, address or contract name" cacheOptions/>
                    </div>
                </div>
                {loading && <div className="PublicNetworksSearch__ResultsWrapper">
                    <SimpleLoader/>
                </div>}
                {!result && !loading && <div className="PublicNetworksSearch__ResultsWrapper">
                    <div className="PublicNetworksSearch__EmptyState">
                        <h5 className="PublicNetworksSearch__EmptyState__Heading">Find a transaction or contract</h5>
                        <p className="PublicNetworksSearch__EmptyState__Description">Paste any transaction hash or contract address into input above and if it is from a publicly verified contract it will be parsed by us.</p>
                    </div>
                </div>}
                {!!result && !loading && <div className="PublicNetworksSearch__ResultsWrapper">
                    {result.type !== 'unknown' && !result.values.length && <div className="PublicNetworksSearch__EmptyState">
                        <h5 className="PublicNetworksSearch__EmptyState__Heading">No Results Founds</h5>
                        <p className="PublicNetworksSearch__EmptyState__Description">Seems that we haven't parsed this contract or transaction yet. Make sure that the contract or transaction is coming from a publicly verified contract on Etherscan.</p>
                    </div>}
                    {result.type === 'unknown' && <div className="PublicNetworksSearch__EmptyState">
                        <h5 className="PublicNetworksSearch__EmptyState__Heading">Invalid Query</h5>
                        <p className="PublicNetworksSearch__EmptyState__Description">Whoops, seems that the query you have entered is not a valid contract address or transaction hash.</p>
                    </div>}
                </div>}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        publicActions: bindActionCreators(publicActions, dispatch),
    }
};

export default withRouter(connect(
    null,
    mapDispatchToProps,
)(PublicNetworksSearch));
