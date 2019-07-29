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
                            <span>All integrations are shared account wide on all projects. If you <strong>edit or delete</strong> an integration it will be applied to all projects and active rules.</span>
                        </Alert>
                        <h4 className="MarginLeft2">Add Integration</h4>
                        <PanelDivider/>
                        <div className="IntegrationsList MarginBottom4">
                            <IntegrationOption icon="mail" onClick={() => this.openIntegrationModal('email')} label="E-mail" active/>
                            <IntegrationOption icon="slack" onClick={() => this.openIntegrationModal('slack')} label="Slack"/>
                            <IntegrationOption icon="code" onClick={() => this.openIntegrationModal('webhook')} label="Webhook"/>
                        </div>
                        <AddIntegrationModal open={openModal} onClose={this.closeIntegrationModal} type={type}/>
                        <h4 className="MarginLeft2">Active Integrations</h4>
                        <PanelDivider/>
                        <div>
                            <List>
                                <ListItem className="ActiveIntegrationItem">
                                    <div className="ActiveIntegrationItem__LabelColumn">Personal Mail</div>
                                    <div className="ActiveIntegrationItem__TypeColumn">E-mail</div>
                                    <div className="ActiveIntegrationItem__ValueColumn MutedText">miljan@tenderly.dev</div>
                                </ListItem>
                                <ListItem className="ActiveIntegrationItem">
                                    <div className="ActiveIntegrationItem__LabelColumn">CryptoKitties Slack</div>
                                    <div className="ActiveIntegrationItem__TypeColumn">Slack</div>
                                    <div className="ActiveIntegrationItem__ValueColumn MutedText">https://slack.com/webhook/123a9s9dqwe-qw811231231z-ase2eqweqweé3</div>
                                </ListItem>
                                <ListItem className="ActiveIntegrationItem">
                                    <div className="ActiveIntegrationItem__LabelColumn">API</div>
                                    <div className="ActiveIntegrationItem__TypeColumn">Webhook</div>
                                    <div className="ActiveIntegrationItem__ValueColumn MutedText">https://myapp.com/api/v1/webhook/123a9s9dqwe-qw811231231z-ase2eqweqweé3</div>
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
