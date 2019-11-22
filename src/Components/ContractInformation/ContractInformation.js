import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {Contract, Project} from "../../Core/models";

import {Tag, Panel, PanelContent, PanelDivider, Tooltip, Icon} from "../../Elements";
import {CopyableText, NetworkTag} from "../index";

import './ContractInformation.scss';

class ContractInformation extends Component {
    render() {
        const {contract, project, tags} = this.props;

        return (
            <Panel className="ContractInformation">
                <PanelContent>
                    <div className="DisplayFlex JustifyContentSpaceBetween">
                        <span className="SemiBoldText">Contract Address:</span>
                        <div className="DisplayFlex AlignItemsCenter">
                            <CopyableText text={contract.address} onSuccessMessage="Copied contract address to clipboard"/>
                            <NetworkTag network={contract.network} className="MarginLeft2"/>
                        </div>
                    </div>
                    <PanelDivider/>
                    <div className="DisplayFlex FlexWrap">
                        <div className="DisplayFlex AlignItemsStart MarginRight4">
                            <span className="MarginRight2 SemiBoldText">Solidity Version:</span>
                            <span className="MutedText">{contract.getMainFileSolidityVersion()}</span>
                        </div>
                        <div className="DisplayFlex AlignItemsStart MarginRight4">
                            <span className="MarginRight2 SemiBoldText">Verification:</span>
                            <div>
                                {contract.isVerifiedPublic && <span id="ContractVerificationStatus" className="ContractInformation__VerifiedStatus"><Icon icon="check-circle"/> Verified</span>}
                                {!contract.isVerifiedPublic && <span id="ContractVerificationStatus" className="ContractInformation__NotVerifiedStatus MutedText"><Icon icon="info"/> Not Verified</span>}
                                <Tooltip id="ContractVerificationStatus">
                                    {contract.isVerifiedPublic && <span>This contract has been verified on {contract.getVerifiedByLabel()}.</span>}
                                    {!contract.isVerifiedPublic && <span>This contract has not been publicly verified on Tenderly or Etherscan. Meaning that it's source code is not public.</span>}
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    {!!project && <Fragment>
                        {!!tags && tags.length > 0 && <Fragment>
                            <PanelDivider/>
                            <div>
                                <span className="MarginRight2 SemiBoldText">Tags:</span>
                                {tags.map(tag => <Tag color="primary-outline" key={tag.tag}>
                                    <Icon icon="tag"/>
                                    <span className="MonospaceFont">{tag.tag}</span>
                                </Tag>)}
                            </div>
                        </Fragment>}
                    </Fragment>}
                </PanelContent>
            </Panel>
        )
    }
}

ContractInformation.propTypes = {
    contract: PropTypes.instanceOf(Contract).isRequired,
    tags: PropTypes.array,
    project: PropTypes.instanceOf(Project),
    onDelete: PropTypes.func,
    onListenToggle: PropTypes.func,
};

export default ContractInformation;
