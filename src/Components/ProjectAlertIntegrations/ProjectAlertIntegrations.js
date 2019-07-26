import React, {Component, Fragment} from 'react';

import {Panel, PanelContent, PanelHeader, Icon, Alert, List, ListItem, PanelDivider} from "../../Elements";
import {AddIntegrationModal} from '../index';

import './ProjectAlertIntegrations.scss';

const IntegrationOption = ({label, icon, onClick = () => {}}) => {
    return (
        <div className="IntegrationsList__Option" onClick={onClick}>
            <Icon icon={icon} className="IntegrationsList__Option__Icon"/>
            <div className="IntegrationsList__Option__Label">{label}</div>
        </div>
    );
};

class ProjectAlertIntegrations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: null,
            openModal: false,
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

        return (
            <Fragment>
                <Panel>
                    <PanelHeader>
                        <h3>Integrations</h3>
                    </PanelHeader>
                    <PanelContent>
                        <Alert color="info">
                            <span>All integrations are shared account wide on all projects. If you <strong>edit or delete</strong> an integration it will be applied to all projects.</span>
                        </Alert>
                        <h4>Add Integration</h4>
                        <PanelDivider/>
                        <div className="IntegrationsList MarginBottom4">
                            <IntegrationOption icon="mail" onClick={() => this.openIntegrationModal('email')} label="E-mail" active/>
                            <IntegrationOption icon="slack" onClick={() => this.openIntegrationModal('slack')} label="Slack"/>
                            <IntegrationOption icon="code" onClick={() => this.openIntegrationModal('webhook')} label="Webhook"/>
                        </div>
                        <AddIntegrationModal open={openModal} onClose={this.closeIntegrationModal} type={type}/>
                        <h4>Active Integrations</h4>
                        <PanelDivider/>
                        <div>
                            <List>
                                <ListItem>
                                    <div>Personal Mail</div>
                                    <div>E-mail</div>
                                    <div>miljan@tenderly.dev</div>
                                </ListItem>
                                <ListItem>
                                    <div>CryptoKitties Slack</div>
                                    <div>Slack</div>
                                    <div>https://slack.com/webhook/123a9s9dqwe-qw811231231z-ase2eqweqweé3</div>
                                </ListItem>
                                <ListItem>
                                    <div>API</div>
                                    <div>Webhook</div>
                                    <div>https://myapp.com/api/v1/webhook/123a9s9dqwe-qw811231231z-ase2eqweqweé3</div>
                                </ListItem>
                            </List>
                        </div>
                    </PanelContent>
                </Panel>
            </Fragment>
        );
    }
}

export default ProjectAlertIntegrations;
