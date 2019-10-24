import React, {Component} from 'react';
import AsyncSelect from 'react-select/async';
import * as _ from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {components} from "react-select";
import {withRouter} from "react-router-dom";

import Analytics from "../../Utils/Analytics";

import {searchActions} from "../../Core/actions";

import {Icon} from "../../Elements";

import './AppSearch.scss';

function AppSearchDropdownIndicator(props) {
    return <components.DropdownIndicator {...props}>
        <Icon icon="search" className="AppSearchDropdownIndicator__IndicatorIcon"/>
    </components.DropdownIndicator>;
}

class AppSearch extends Component {
    debouncedSearch = _.debounce(async (query, callback) => {
        const {searchActions} = this.props;

        if (!callback) return;

        const searchResponse = await searchActions.getSearchResults(query);

        Analytics.trackEvent('app_header_search');

        if (searchResponse.success) {
            callback(searchResponse.data)
        } else {
            callback([]);
        }
    }, 1000);

    handleInputChange = () => {};

    /**
     * @param {SearchResult} searchResult
     */
    handleSearchSelect = (searchResult) => {
        console.log(searchResult);
    };

    fetchSearchResults = (query, callback) => {
        this.debouncedSearch(query, callback);
    };

    render() {
        const {projectContext} = this.props;

        return (
            <div className="AppSearch">
                <div className="Select AppSearch__Select">
                    <AsyncSelect classNamePrefix="Select" onInputChange={this.handleInputChange} onChange={this.handleSearchSelect} components={{
                        // Option: SearchResultSelectOption,
                        // NoOptionsMessage: (props) => <SearchResultsNoOptionsMessage {...props} query={searchQuery}/>,
                        IndicatorSeparator: () => null,
                        DropdownIndicator: AppSearchDropdownIndicator,
                    }} loadOptions={this.fetchSearchResults} placeholder="Search by tx hash, address or contract name" cacheOptions/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projectContext: state.search.currentProject,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchActions: bindActionCreators(searchActions, dispatch),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppSearch));
