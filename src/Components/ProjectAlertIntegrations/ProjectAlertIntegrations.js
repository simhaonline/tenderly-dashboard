import React, {Component} from 'react';
import classNames from 'classnames';

import {Panel, PanelContent, PanelHeader, Icon, Tag} from "../../Elements";

import './ProjectAlertIntegrations.scss';

const IntegrationOption = ({active, label, description, icon}) => {
    return (
        <div className={classNames(
            "IntegrationsList__Option",
            {
                "IntegrationsList__Option--Active": active,
            }
        )}>
            <Icon icon={icon} className="IntegrationsList__Option__Icon"/>
            <div className="IntegrationsList__Info">
                <div className="IntegrationsList__Info__Label">
                    <span className="MarginRight1">{label}</span>
                    {active && <Tag size="small">Active</Tag>}
                </div>
                <div className="IntegrationsList__Info__Description">
                    {description}
                </div>
            </div>
            {!active && <div className="IntegrationsList__AddWrapper">
                <Icon icon="plus"/>
            </div>}
        </div>
    );
};

class ProjectAlertIntegrations extends Component {
    render() {
        return (
            <Panel>
                <PanelHeader>
                    <h3>Integrations</h3>
                </PanelHeader>
                <PanelContent>
                    <div className="IntegrationsList">
                        <IntegrationOption icon="mail" label="E-mail" active description="Description for integration option"/>
                        <IntegrationOption icon="slack" label="Slack" description="Description for integration option"/>
                    </div>
                </PanelContent>
            </Panel>
        );
    }
}

export default ProjectAlertIntegrations;
