import React, {Component} from 'react';
import AsyncSelect from 'react-select/async';
import * as _ from "lodash";
import {connect} from "react-redux";

import './AppSearch.scss';
import Analytics from "../../Utils/Analytics";
import {components} from "react-select";
import {Icon} from "../../Elements";

function AppSearchDropdownIndicator(props) {
    return <components.DropdownIndicator {...props}>
        <Icon icon="search" className="AppSearchDropdownIndicator__IndicatorIcon"/>
    </components.DropdownIndicator>;
}

class AppSearch extends Component {
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

    render() {
        const {projectContext} = this.props;

        console.log(projectContext);

        return (
            <div className="AppSearch">
                <AsyncSelect classNamePrefix="Select" onInputChange={this.handleInputChange} onChange={this.handleSearchSelect} components={{
                    // Option: SearchResultSelectOption,
                    // NoOptionsMessage: (props) => <SearchResultsNoOptionsMessage {...props} query={searchQuery}/>,
                    IndicatorSeparator: () => null,
                    DropdownIndicator: AppSearchDropdownIndicator,
                }} loadOptions={this.fetchSearchResults} placeholder="Search by tx hash, address or contract name" cacheOptions/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projectContext: state.search.projectContext,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppSearch);
