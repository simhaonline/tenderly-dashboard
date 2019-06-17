import React, {Component} from 'react';

import {EtherscanLinkTypes} from "../../Common/constants";

import {Panel, PanelContent} from "../../Elements";

import EtherscanLink from "../EtherscanLink/EtherscanLink";

import './ContractInformation.scss';

class ContractInformation extends Component {
    render() {
        const {contract} = this.props;

        return (
            <Panel className="ContractInformation">
                <PanelContent className="ContractDetails">
                    <div className="DetailsWrapper">
                        <div className="DetailLabel">Address:</div>
                        <div className="DetailValue">
                            <EtherscanLink network={contract.network} type={EtherscanLinkTypes.ADDRESS} value={contract.address}>{contract.address}</EtherscanLink>
                        </div>
                    </div>
                    <div className="DetailsWrapper">
                        <div className="DetailLabel">Solidity Version:</div>
                        <div className="DetailValue">{contract.getMainFileSolidityVersion()}</div>
                    </div>
                </PanelContent>
            </Panel>
        )
    }
}

export default ContractInformation;
