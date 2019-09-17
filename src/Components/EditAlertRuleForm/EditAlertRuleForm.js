import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link, Redirect} from "react-router-dom";

import Intercom from '../../Utils/Intercom';

import * as alertingActions from "../../Core/Alerting/Alerting.actions";
import * as notificationActions from "../../Core/Notification/Notification.actions";

import {getAlertRule, isAlertRuleLoaded} from "../../Common/Selectors/AlertingSelectors";
import {
    areNotificationDestinationsLoaded,
    getNotificationDestinationsForRule
} from "../../Common/Selectors/NotificationSelectors";

import {
    Button,
    Icon,
    Panel,
    PanelContent,
    Card,
    PanelHeader,
    Toggle,
    Dialog,
    DialogBody,
    DialogHeader,
    List,
    LinkButton,
    ListItem,
    PanelDivider
} from "../../Elements";
import {SimpleLoader, DestinationInformation, EmptyState} from "..";

import './EditAlertRuleForm.scss';

class EditAlertRuleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openDeleteModal: false,
            errorFetching: false,
            alertDeleted: false,
        };
    }

    async componentDidMount() {
        const {ruleId, projectId, isRuleLoaded, actions, notificationActions, destinationsLoaded} = this.props;

        if (!destinationsLoaded) {
            notificationActions.fetchNotificationDestinations();
        }

        if (!isRuleLoaded) {
            const response = await actions.fetchAlertRuleForProject(projectId, ruleId);

            if (!response.success) {
                this.setState({
                    errorFetching: true,
                });
            }
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

    /**
     * @param {NotificationDestination} destination
     */
    removeDestination = (destination) => {
        // const {actions, rule} = this.props;

        // @TODO finish remove alert destination
        // const updatedRule = rule.update({
        //     enabled: !rule.enabled,
        // });

        // actions.updateAlertRuleForProject(projectId, updatedRule);
    };

    render() {
        const {isRuleLoaded, rule, projectId, destinations, destinationsLoaded} = this.props;
        const {openDeleteModal, alertDeleted, errorFetching} = this.state;

        const loading = (!isRuleLoaded || !destinationsLoaded) && !errorFetching;

        if (alertDeleted) {
            return <Redirect to={`/project/${projectId}/alerts/rules`}/>
        }

        return (
            <Panel className="EditAlertRuleForm">
                <PanelHeader>
                    <h3>
                        <Link to={`/project/${projectId}/alerts/rules`}>Alerts</Link>
                        {isRuleLoaded && <Icon icon="chevron-right" className="MarginLeft1 MarginRight1 MutedText"/>}
                        {!!rule && <span>{rule.name}</span>}
                    </h3>
                    <div className="MarginLeftAuto">
                        <LinkButton onClick={() => Intercom.openNewConversation('Suggestion/feedback for alerting:\n')}>Have suggestions or feedback?</LinkButton>
                    </div>
                </PanelHeader>
                <PanelContent>
                    {loading && <div className="DisplayFlex Padding4 AlignItemsCenter JustifyContentCenter">
                        <SimpleLoader/>
                    </div>}
                    {!loading && errorFetching && <div>
                        <EmptyState icon="bell-off" title="Alert not found" description="Seems that this alert does not exist any more." renderActions={() => <div>
                            <Button outline to={`/project/${projectId}/alerts/rules`} size="small">
                                <Icon icon="arrow-left"/>
                                <span>Back to alerts</span>
                            </Button>
                        </div>}/>
                    </div>}
                    {!loading && !errorFetching && <div>
                        <div className="MarginBottom3">
                            <h4>ID: </h4>
                            <div>{rule.id}</div>
                        </div>
                        <PanelDivider/>
                        <div className="MarginBottom3">
                            <h4>Name</h4>
                            <div>{rule.name}</div>
                        </div>
                        {!!rule.description && <div className="MarginBottom3">
                            <h4>Description</h4>
                            <div>{rule.description || '-'}</div>
                        </div>}
                        <Card className="DisplayFlex AlignItemsCenter" color="light" onClick={this.toggleAlertRuleEnabled} clickable>
                            <div>
                                Alert Enabled
                            </div>
                            <div className="MarginLeftAuto">
                                <Toggle value={rule.enabled}/>
                            </div>
                        </Card>
                        <PanelDivider/>
                        {!!destinations.length && <div className="MarginBottom4">
                            <h4 className="MarginBottom2">Alerts will be sent to these destinations</h4>
                            <List>
                                {destinations.map(destination => <ListItem key={destination.id} className="DisplayFlex">
                                    <div>
                                        <span className="SemiBoldText">{destination.label}</span>
                                    </div>
                                    <div className="MarginLeftAuto">
                                        <DestinationInformation destination={destination}/>
                                    </div>
                                    {false && <div>
                                        {destinations.length > 1 && <Button color="danger" outline size="small" onClick={() => this.removeDestination(destination)}>
                                            <Icon icon="trash-2"/>
                                        </Button>}
                                    </div>}
                                </ListItem>)}
                            </List>
                        </div>}
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
