import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {FeatureFlagTypes} from "../../Common/constants";

import {Card, Icon} from "../../Elements";
import {FeatureFlag, LoginRequiredModal, PublicContractQuickActionModal} from "../index";

import './PublicContractQuickActions.scss';

class PublicContractQuickActions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginModalOpen: false,
            actionType: null,
            actionModalOpen: false,
        }
    }

    openLoginModal = () => {
        this.setState({
            loginModalOpen: true,
        });
    };

    closeLoginModal = () => {
        this.setState({
            loginModalOpen: false,
        });
    };

    openActionModal = (actionType) => {
        this.setState({
            actionModalOpen: true,
            actionType,
        });
    };

    closeActionModal = () => {
        this.setState({
            actionModalOpen: false,
        });
    };

    handleActionClick = (actionType) => {
        const {loggedIn} = this.props;

        if (!loggedIn) {
            this.openLoginModal();
            return;
        }

        this.openActionModal(actionType);
    };

    render() {
        const {loginModalOpen, actionModalOpen, actionType} = this.state;
        const {contract} = this.props;

        return (
            <Fragment>
                <div className="PublicContractQuickActions">
                    <Card selectable onClick={() => this.handleActionClick('add_to_project')} className="PublicContractQuickActions__Action">
                        <div className="PublicContractQuickActions__Action__Icon">
                            <Icon icon="project"/>
                        </div>
                        <span>Add to Project</span>
                    </Card>
                    <FeatureFlag flag={FeatureFlagTypes.ALERTS}>
                        <Card selectable onClick={() => this.handleActionClick('setup_alerting')} className="PublicContractQuickActions__Action">
                            <div className="PublicContractQuickActions__Action__Icon">
                                <Icon icon="alerting"/>
                            </div>
                            <span>Setup Alerts</span>
                        </Card>
                    </FeatureFlag>
                    <Card selectable onClick={() => this.handleActionClick ('filter_transactions')} className="PublicContractQuickActions__Action">
                        <div className="PublicContractQuickActions__Action__Icon">
                            <Icon icon="filter"/>
                        </div>
                        <span>Filter Transactions</span>
                    </Card>
                </div>
                <LoginRequiredModal open={loginModalOpen} onClose={this.closeLoginModal}/>
                <PublicContractQuickActionModal contract={contract} open={actionModalOpen} type={actionType} onClose={this.closeActionModal}/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
    }
};

export default connect(
    mapStateToProps,
    null
)(PublicContractQuickActions);
