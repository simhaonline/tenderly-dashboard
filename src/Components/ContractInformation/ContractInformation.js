import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

import {NetworkAppToRouteTypeMap} from "../../Common/constants";

import {Panel, PanelContent, PanelDivider, Tooltip, Icon, Toggle, Button, Dialog, DialogBody, DialogHeader} from "../../Elements";
import {CopyableText, NetworkTag} from "../index";

import './ContractInformation.scss';

class ContractInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteModalOpen: false,
        };
    }

    openDeleteModal = () => {
        this.setState({
            deleteModalOpen: true,
        })
    };

    closeDeleteModal = () => {
        this.setState({
            deleteModalOpen: false,
        })
    };

    handleListeningToggle = () => {
        const {contract, onListenToggle} = this.props;

        onListenToggle(contract);
    };

    handleContractDelete = () => {
        const {contract, onDelete} = this.props;

        this.closeDeleteModal();

        onDelete(contract);
    };

    render() {
        const {contract} = this.props;
        const {deleteModalOpen} = this.state;

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
                    {!contract.isPublic && <Fragment>
                        <PanelDivider/>
                        <div className="DisplayFlex AlignItemsCenter JustifyContentEnd">
                            <div className="DisplayFlex AlignItemsStart MarginRight4">
                                <span className="MarginRight2 SemiBoldText">Listening: <Icon icon="info" className="MutedText"/></span>
                                <div>
                                    <Toggle value={contract.listening} onChange={this.handleListeningToggle}/>
                                </div>
                            </div>
                            <div>
                                <Button color="danger" outline size="small" onClick={this.openDeleteModal}>
                                    <span>Remove Contract</span>
                                </Button>
                            </div>
                        </div>
                        <Dialog onClose={this.closeDeleteModal} open={deleteModalOpen}>
                            <DialogHeader>
                                <h3>Are you sure you want to remove this contract?</h3>
                            </DialogHeader>
                            <DialogBody>
                                <div className="DisplayFlex JustifyContentEnd">
                                    <Button color="secondary" onClick={this.closeDeleteModal}>Cancel</Button>
                                    <Button color="secondary" outline onClick={this.handleContractDelete}>
                                        <span>Yes, remove</span>
                                    </Button>
                                </div>
                            </DialogBody>
                        </Dialog>
                    </Fragment>}
                    {contract.isPublic && <Fragment>
                        <PanelDivider/>
                        <div className="ContractInformation__PublicNavigation">
                            <NavLink exact to={`/contract/${NetworkAppToRouteTypeMap[contract.network]}/${contract.address}`} className="ContractInformation__PublicNavigation__NavItem">
                                <span>Transactions</span>
                            </NavLink>
                            <NavLink exact to={`/contract/${NetworkAppToRouteTypeMap[contract.network]}/${contract.address}/source`} className="ContractInformation__PublicNavigation__NavItem">
                                <span>Source Code</span>
                            </NavLink>
                        </div>
                    </Fragment>}
                </PanelContent>
            </Panel>
        )
    }
}

ContractInformation.propTypes = {
    onDelete: PropTypes.func,
    onListenToggle: PropTypes.func,
};

export default ContractInformation;
