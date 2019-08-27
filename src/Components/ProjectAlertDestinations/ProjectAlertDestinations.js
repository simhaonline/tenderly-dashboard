import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";

import * as notificationActions from "../../Core/Notification/Notification.actions";

import {
    areNotificationDestinationsLoaded, getNotificationDestinations
} from "../../Common/Selectors/NotificationSelectors";

import {Panel, PanelContent, PanelHeader, Card, CardsWrapper, Icon, Alert, List, ListItem, PanelDivider} from "../../Elements";
import {AddIntegrationModal, DestinationInformation, SimpleLoader} from '..';

import './ProjectAlertDestinations.scss';

const DestinationOption = ({label, icon, onClick = () => {}}) => {
    return (
        <Card selectable color="light" className="IntegrationsList__Option" onClick={onClick}>
            <Icon icon={icon} className="IntegrationsList__Option__Icon"/>
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
        });
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
                            <span>All destinations are shared account wide on all projects. If you <strong>edit or delete</strong> an integration it will be applied to all projects and active rules.</span>
                        </Alert>
                        <h4 className="MarginLeft2">Add Destination</h4>
                        <PanelDivider/>
                        <CardsWrapper horizontal className="MarginBottom4">
                            <DestinationOption icon="mail" onClick={() => this.openIntegrationModal('email')} label="E-mail" active/>
                            <DestinationOption icon="slack" onClick={() => this.openIntegrationModal('slack')} label="Slack"/>
                            <DestinationOption icon="code" onClick={() => this.openIntegrationModal('webhook')} label="Webhook"/>
                        </CardsWrapper>
                        <AddIntegrationModal open={openModal} onClose={this.closeIntegrationModal} type={type}/>
                        <h4 className="MarginLeft2">Active Destinations</h4>
                        <PanelDivider/>
                        <div>
                            {!destinationsLoaded && <div className="Padding4 DisplayFlex JustifyContentCenter">
                                <SimpleLoader/>
                            </div>}
                            {destinationsLoaded && <List>
                                {destinations.map(destination => <ListItem className="ActiveIntegrationItem" key={destination.id}>
                                    <div className="ActiveIntegrationItem__LabelColumn">{destination.label}</div>
                                    <div className="ActiveIntegrationItem__TypeColumn">{destination.type}</div>
                                    <div className="ActiveIntegrationItem__ValueColumn MutedText">
                                        <DestinationInformation destination={destination}/>
                                    </div>
                                </ListItem>)}
                            </List>}
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
