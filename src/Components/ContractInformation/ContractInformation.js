import React, {Component} from 'react';

import {Panel, PanelContent} from "../../Elements";
import {CopyableText} from "../index";

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
                            <CopyableText text={contract.address} onSuccessMessage="Copied contract address to clipboard"/>
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
