import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {components} from 'react-select';
import AsyncSelect from 'react-select/async';
import * as _ from "lodash";

import Analytics from "../../Utils/Analytics";
import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

import * as publicActions from "../../Core/PublicContracts/PublicContracts.actions";

import {Icon} from '../../Elements';
import {ContractSelectOption, TransactionSelectOption} from "../index";

import './PublicNetworksSearch.scss';

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
                <a className="SearchResultsNoOptionsMessage__ActionLink" href="https://medium.com/tenderly/a-tenderly-update-debugging-ethereum-transactions-verifying-contracts-and-other-newsworthy-4d7f20317f92#75c6" target="_blank" rel="noopener noreferrer">
                    <Icon className="SearchResultsNoOptionsMessage__ActionLink__Icon" icon="arrow-right"/>
                    <h4>Verifying your contracts on Tenderly</h4>
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

    if (data.type === 'transaction') {
        return <TransactionSelectOption {...props}/>;
    }

    return <ContractSelectOption {...props}/>;
}

class PublicNetworksSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
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

        const networkRoute = getRouteSlugForNetwork(network);

        history.push(`/${type}/${networkRoute}/${suffix}`);
    };

    handleSearchSelect = (option) => {
        Analytics.trackEvent('explore_page_search_selected');

        if (option.type === 'transaction') {
            this.goTo('tx', option.network, option.txHash);
        } else {
            this.goTo('contract', option.network, option.address);
        }
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
                        }} loadOptions={this.fetchSearchResults} placeholder="Search by tx hash, address or contract name" cacheOptions/>
                    </div>
                </div>
                <div className="PublicNetworksSearch__ResultsWrapper">
                    <div className="PublicNetworksSearch__EmptyState">
                        <h5 className="PublicNetworksSearch__EmptyState__Heading">Find a transaction or contract</h5>
                        <p className="PublicNetworksSearch__EmptyState__Description">Paste any transaction hash or contract address into input above and if it is from a publicly verified contract it will be parsed by us.</p>
                    </div>
                </div>
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
