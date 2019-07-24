import React, {Component, Fragment} from 'react';

import {Panel, PanelContent, PanelHeader, Icon, Alert, List, ListItem} from "../../Elements";

import './ProjectAlertIntegrations.scss';

const IntegrationOption = ({label, icon}) => {
    return (
        <div className="IntegrationsList__Option">
            <Icon icon={icon} className="IntegrationsList__Option__Icon"/>
            <div className="IntegrationsList__Option__Label">{label}</div>
        </div>
    );
};

class ProjectAlertIntegrations extends Component {
    render() {
        return (
            <Fragment>
                <Panel>
                    <PanelHeader>
                        <h3>Integrations</h3>
                    </PanelHeader>
                    <PanelContent>
                        <Alert color="info">
                            <span>All integrations are shared account wide.</span>
                        </Alert>
                        <div className="IntegrationsList">
                            <IntegrationOption icon="mail" label="E-mail" active/>
                            <IntegrationOption icon="slack" label="Slack"/>
                        </div>
                        <div>
                            <List>
                                <ListItem>
                                    asda
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
