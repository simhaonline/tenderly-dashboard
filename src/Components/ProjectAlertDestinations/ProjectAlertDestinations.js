import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";

import * as notificationActions from "../../Core/Notification/Notification.actions";

import {
    areNotificationDestinationsLoaded, getNotificationDestinations
} from "../../Common/Selectors/NotificationSelectors";
import {FeatureFlagTypes, NotificationDestinationTypes} from "../../Common/constants";

import {Panel, PanelContent, PanelHeader, Card, CardsWrapper, Icon, Alert, List, ListItem, PanelDivider, Button} from "../../Elements";
import {AddIntegrationModal, FeatureFlag, EmptyState, DestinationInformation, SimpleLoader, SlackIcon, TelegramIcon} from '..';

import './ProjectAlertDestinations.scss';

const DestinationOption = ({label, icon, onClick = () => {}}) => {
    return (
        <Card selectable color="light" className="IntegrationsList__Option" onClick={onClick}>
            {icon === 'slack' && <SlackIcon size={22} className="MarginBottom2"/>}
            {icon === 'telegram' && <TelegramIcon size={22} className="MarginBottom2"/>}
            {!['slack', 'telegram'].includes(icon) && <Icon icon={icon} className="IntegrationsList__Option__Icon"/>}
            <div className="IntegrationsList__Option__Label">{label}</div>
        </Card>
    );
};

class ProjectAlertDestinations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: null,
            openModal: false,
        }
    }

    componentDidMount() {
        const {actions, destinationsLoaded} = this.props;

        if (!destinationsLoaded) {
            actions.fetchNotificationDestinations();
        }
    }

    openIntegrationModal = (type) => {
        this.setState({
            openModal: true,
            type,
        });
    };

    closeIntegrationModal = () => {
        this.setState({
            openModal: false,
            type: null,
        });
    };

    /**
     * @param {{
     *     type: NotificationDestinationTypes,
     *     label: string,
     *     value: string,
     * }} data
     */
    handleCreateDestination = async ({type, label, value}) => {
        const {actions} = this.props;

        return actions.createNotificationDestination(type, label, value);
    };

    /**
     * @param {NotificationDestination} destination
     */
    removeDestination = async (destination) => {
        const {actions} = this.props;

        await actions.deleteNotificaitonDestination(destination.id);
    };

    render() {
        const {openModal, type} = this.state;
        const {destinationsLoaded, destinations} = this.props;

        return (
            <Fragment>
                <Panel>
                    <PanelHeader>
                        <h3>Destinations</h3>
                    </PanelHeader>
                    <PanelContent>
                        <Alert color="info">
                            <span>All destinations are shared account wide on all projects. If you <strong>edit or delete</strong> an destination it will be applied to all projects and active rules.</span>
                        </Alert>
                        <h4 className="MarginLeft2">Add Destination</h4>
                        <PanelDivider/>
                        <CardsWrapper horizontal className="MarginBottom4">
                            <FeatureFlag flag={FeatureFlagTypes.ALERTS}>
                                <DestinationOption icon="mail" onClick={() => this.openIntegrationModal(NotificationDestinationTypes.EMAIL)} label="E-mail"/>
                            </FeatureFlag>
                            <DestinationOption icon="slack" onClick={() => this.openIntegrationModal(NotificationDestinationTypes.SLACK)} label="Slack"/>
                            <DestinationOption icon="discord" onClick={() => this.openIntegrationModal(NotificationDestinationTypes.DISCORD)} label="Discord"/>
                            <FeatureFlag flag={FeatureFlagTypes.ALERTS}>
                                <DestinationOption icon="telegram" onClick={() => this.openIntegrationModal(NotificationDestinationTypes.TELEGRAM)} label="Telegram"/>
                            </FeatureFlag>
                            <FeatureFlag flag={FeatureFlagTypes.ALERTS}>
                                <DestinationOption icon="code" onClick={() => this.openIntegrationModal(NotificationDestinationTypes.WEBHOOK)} label="Webhook"/>
                            </FeatureFlag>
                        </CardsWrapper>
                        <AddIntegrationModal open={openModal} onSubmit={this.handleCreateDestination} onClose={this.closeIntegrationModal} type={type}/>
                        <h4 className="MarginLeft2">Active Destinations</h4>
                        <PanelDivider/>
                        <div>
                            {!destinationsLoaded && <div className="Padding4 DisplayFlex JustifyContentCenter">
                                <SimpleLoader/>
                            </div>}
                            {destinationsLoaded && <List>
                                {destinations.map(destination => <ListItem className="ActiveIntegrationItem" key={destination.id}>
                                    <div className="ActiveIntegrationItem__LabelColumn">{destination.label}</div>
                                    <div className="ActiveIntegrationItem__TypeColumn">{destination.getTypeLabel()}</div>
                                    <div className="ActiveIntegrationItem__ValueColumn MutedText">
                                        <DestinationInformation destination={destination}/>
                                    </div>
                                    <div className="ActiveIntegrationItem__Actions">
                                        {destination.type !== NotificationDestinationTypes.EMAIL && <Button color="danger" outline size="small" onClick={() => this.removeDestination(destination)}>
                                            <Icon icon="trash-2"/>
                                        </Button>}
                                    </div>
                                </ListItem>)}
                            </List>}
                            {destinationsLoaded && destinations.length === 0 &&
                                <EmptyState icon="send" title="No Destinations" description="No destinations have been setup yet. Start by clicking on a destination above and adding them."/>
                            }
                        </div>
                    </PanelContent>
                </Panel>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {projectId}}} = ownProps;

    return {
        projectId,
        destinations: getNotificationDestinations(state),
        destinationsLoaded: areNotificationDestinationsLoaded(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(notificationActions, dispatch),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectAlertDestinations));
