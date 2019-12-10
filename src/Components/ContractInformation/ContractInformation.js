import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {Contract, Project, ProjectContract} from "../../Core/models";

import {Tag, Panel, PanelContent, PanelDivider, Tooltip, Icon, LinkButton} from "../../Elements";
import {CopyableText, NetworkTag, ContractRevisionAddTagModal, PermissionControl} from "../index";

import './ContractInformation.scss';
import {CollaboratorPermissionTypes} from "../../Common/constants";

class ContractInformation extends Component {
    state = {
        addTagModalOpen: false,
    };

    /**
     * @param {boolean} value
     */
    setAddTagModal = (value) => {
        this.setState({
            addTagModalOpen: value,
        });
    };

    render() {
        const {project, contract, projectContract} = this.props;
        const {addTagModalOpen} = this.state;

        let revision;

        if (projectContract) {
            revision = projectContract.getRevision(contract.id);
        }

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
                    {!!projectContract && <Fragment>
                        <PanelDivider/>
                        <div>
                            <span className="MarginRight2 SemiBoldText">Tags:</span>
                            {revision.tags.map(tag => <Tag color="primary-outline" key={tag.label}>
                                <Icon icon="tag"/>
                                <span className="MonospaceFont">{tag.label}</span>
                            </Tag>)}
                            <PermissionControl requiredPermission={CollaboratorPermissionTypes.ADD_CONTRACT} project={project}>
                                <LinkButton onClick={() => this.setAddTagModal(true)} className="MarginLeft1">
                                    <Icon icon="plus"/>
                                    <span >Add Tag</span>
                                </LinkButton>
                            </PermissionControl>
                            <ContractRevisionAddTagModal revision={revision} open={addTagModalOpen} onClose={() => this.setAddTagModal(false)}/>
                        </div>
                    </Fragment>}
                </PanelContent>
            </Panel>
        )
    }
}

ContractInformation.propTypes = {
    contract: PropTypes.instanceOf(Contract).isRequired,
    project: PropTypes.instanceOf(Project),
    projectContract: PropTypes.instanceOf(ProjectContract),
};

export default ContractInformation;
