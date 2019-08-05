import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link, Redirect} from "react-router-dom";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";
import * as notificationActions from "../../Core/Notification/Notification.actions";

import {getAlertRule, isAlertRuleLoaded} from "../../Common/Selectors/AlertingSelectors";
import {
    areNotificationDestinationsLoaded,
    getNotificationDestinationsForRule
} from "../../Common/Selectors/NotificationSelectors";

import {Button, Icon, Panel, PanelContent, PanelHeader, Toggle, Dialog, DialogBody, DialogHeader, List, ListItem} from "../../Elements";
import {SimpleLoader, DestinationInformation} from "..";

class EditAlertRuleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openDeleteModal: false,
            alertDeleted: false,
        };
    }

    componentDidMount() {
        const {ruleId, projectId, isRuleLoaded, actions, notificationActions, destinationsLoaded} = this.props;

        if (!isRuleLoaded) {
            actions.fetchAlertRuleForProject(projectId, ruleId);
        }

        if (!destinationsLoaded) {
            notificationActions.fetchNotificationDestinations();
        }
    }

    toggleAlertRuleEnabled = () => {
        const {rule, projectId, actions} = this.props;

        const updatedRule = rule.update({
            enabled: !rule.enabled,
        });

        actions.updateAlertRuleForProject(projectId, updatedRule);
    };

    openDeleteModal = () => {
        this.setState({
            openDeleteModal: true,
        });
    };

    closeDeleteModal = () => {
        this.setState({
            openDeleteModal: false,
        });
    };

    deleteAlert = async () => {
        const {actions, projectId, ruleId} = this.props;

        const response = await actions.deleteAlertRuleForProject(projectId, ruleId);

        if (response.success) {
            this.setState({
                alertDeleted: true,
            }, this.closeDeleteModal);
        }
    };

    render() {
        const {isRuleLoaded, rule, projectId, destinations, destinationsLoaded} = this.props;
        const {openDeleteModal, alertDeleted} = this.state;

        const loading = !isRuleLoaded || !destinationsLoaded;

        if (alertDeleted) {
            return <Redirect to={`/project/${projectId}/alerts/rules`}/>
        }

        return (
            <Panel>
                <PanelHeader>
                    <h3>
                        <Link to={`/project/${projectId}/alerts/rules`}>Alerts</Link>
                        {isRuleLoaded && <Icon icon="chevron-right" className="MarginLeft1 MarginRight1 MutedText"/>}
                        {!!rule && <span>{rule.name}</span>}
                    </h3>
                </PanelHeader>
                <PanelContent>
                    {loading && <div className="DisplayFlex Padding4 AlignItemsCenter JustifyContentCenter">
                        <SimpleLoader/>
                    </div>}
                    {!loading && <div>
                        <div>
                            {rule.id}
                        </div>
                        <div>
                            {rule.name}
                        </div>
                        <div>
                            {rule.description}
                        </div>
                        <div>
                            Alert Enabled:
                            <Toggle value={rule.enabled} onChange={this.toggleAlertRuleEnabled}/>
                        </div>
                        {!!destinations.length && <List>
                            {destinations.map(destination => <ListItem key={destination.id} className="DisplayFlex">
                                <div>
                                    <span className="SemiBoldText">{destination.label}</span>
                                </div>
                                <div>
                                    <DestinationInformation destination={destination}/>
                                </div>
                                <div>
                                    <Icon icon="trash-2" className="DangerText CursorPointer"/>
                                </div>
                            </ListItem>)}
                        </List>}
                        <div>
                            <Button color="danger" outline onClick={this.openDeleteModal}>
                                <span>Remove Alert</span>
                            </Button>
                        </div>
                    </div>}
                    <Dialog open={openDeleteModal} onClose={this.closeDeleteModal}>
                        <DialogHeader>
                            <h3>Remove Alert from Project</h3>
                        </DialogHeader>
                        <DialogBody>
                            <p className="TextAlignCenter">Are your sure?</p>
                            <div className="DisplayFlex JustifyContentCenter">
                                <Button color="danger" outline onClick={this.closeDeleteModal} width={130}>
                                    <span>Cancel</span>
                                </Button>
                                <Button color="danger" onClick={this.deleteAlert} width={130}>
                                    <span>Remove Alert</span>
                                </Button>
                            </div>
                        </DialogBody>
                    </Dialog>
                </PanelContent>
            </Panel>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {ruleId, projectId}}} = ownProps;

    const rule = getAlertRule(state, ruleId);

    return {
        projectId,
        ruleId,
        rule,
        isRuleLoaded: isAlertRuleLoaded(state, ruleId),
        destinations: getNotificationDestinationsForRule(state, rule),
        destinationsLoaded: areNotificationDestinationsLoaded(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(alertingActions, dispatch),
        notificationActions: bindActionCreators(notificationActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditAlertRuleForm);
