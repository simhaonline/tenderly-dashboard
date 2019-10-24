import React, {Component} from 'react';
import AsyncSelect from 'react-select/async';
import * as _ from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {components} from "react-select";
import {withRouter} from "react-router-dom";
import Blockies from "react-blockies";

import Analytics from "../../Utils/Analytics";
import {generateShortAddress} from "../../Utils/AddressFormatter";

import {searchActions} from "../../Core/actions";

import {Icon} from "../../Elements";
import {NetworkTag} from "../index";

import './AppSearch.scss';

function AppSearchDropdownIndicator(props) {
    return <components.DropdownIndicator {...props}>
        <Icon icon="search" className="AppSearchDropdownIndicator__IndicatorIcon"/>
    </components.DropdownIndicator>;
}

function AppSearchSelectOption(props) {
    /** @type {SearchResult} */
    const data = props.data;

    const projectInfo = data.getProjectInfo();

    return (
        <components.Option {...props} className="AppSearchSelectOption">
            <Blockies size={8} scale={5} className="AppSearchSelectOption__Blockie" seed={data.value}/>
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

function AppSearchNoOptionsMessage(props) {
    const {query} = props;

    return <div className="AppSearchNoOptionsMessage TextAlignCenter">
        {query.length === 0 && <div>
            Search by transaction hash, address or contract name
        </div>}
        {!!query.length && query.length < 3 && <div>
            Type in at least 3 characters in order to see results
        </div>}
        {query.length >= 3 && <div>
            <div className="MarginBottom1 SemiBoldText">No transactions or contracts found for this query</div>
            <div>This can happen if the contract is not verified or does not exist</div>
        </div>}
    </div>
}

class AppSearch extends Component {
    state = {
        searchQuery: '',
    };

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

    handleInputChange = (value) => {
        this.setState({
            searchQuery: value,
        });
    };

    /**
     * @param {SearchResult} searchResult
     */
    handleSearchSelect = (searchResult) => {
        const {history} = this.props;

        this.setState({
            searchQuery: '',
        });

        history.push(searchResult.getUrl());
    };

    fetchSearchResults = (query, callback) => {
        this.debouncedSearch(query, callback);
    };

    render() {
        const {searchQuery} = this.state;

        return (
            <div className="AppSearch">
                <div className="Select AppSearch__Select">
                    <AsyncSelect classNamePrefix="Select" onInputChange={this.handleInputChange} onChange={this.handleSearchSelect} components={{
                        Option: AppSearchSelectOption,
                        NoOptionsMessage: (props) => <AppSearchNoOptionsMessage {...props} query={searchQuery}/>,
                        IndicatorSeparator: () => null,
                        DropdownIndicator: AppSearchDropdownIndicator,
                    }} loadOptions={this.fetchSearchResults} value={searchQuery} placeholder="Search"/>
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
