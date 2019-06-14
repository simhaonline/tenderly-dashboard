import React, {Component} from 'react';

import {Icon} from "../../Elements";

import EtherscanLink from "../EtherscanLink/EtherscanLink";
import NetworkTag from "../NetworkTag/NetworkTag";

import './PublicContractsInfo.scss';

class PublicContractsInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
        }
    }

    handleSearchQueryUpdate = (event) => {
        this.setState({
            searchQuery: event.target.value,
        });
    };

    render() {
        const {network} = this.props;
        const {searchQuery} = this.state;

        return (
            <div className="PublicContractsInfo">
                <div className="ContractsHeading">
                    <h2 className="PageTitle">Contracts</h2>
                    <div className="SearchWrapper">
                        <div className="SearchInput">
                            <input type="text"
                                   placeholder="Find contract by address..."
                                   value={searchQuery}
                                   onChange={this.handleSearchQueryUpdate}/>
                            <Icon icon="search"/>
                        </div>
                        <div className="SearchSuggestions"></div>
                    </div>
                </div>
                <div className="ContractsSubHeading">
                    <div className="NetworkPicker">
                        <div className="NetworkPickerLabel">Network:</div>
                        <div className="NetworkPickerValue">
                            <NetworkTag network={network}/>
                            <Icon icon="chevron-down"/>
                        </div>
                    </div>
                </div>
                <p>We track all contract errors with a full stack trace that happen on public <EtherscanLink network={network} path={"contractsVerified"}>verified contracts</EtherscanLink>.</p>
            </div>
        );
    }
}

export default PublicContractsInfo;
