import React from 'react';

import {Panel, PanelContent, PanelHeader, ProgressBar} from "../../Elements";

const ProjectPlanUsage = ({usage}) => {
    return (
        <Panel>
            <PanelHeader>
                <h3>Plan Usage</h3>
            </PanelHeader>
            <PanelContent>
                <div className="MaxWidth480">
                    <div>
                        <h3>Contracts</h3>
                        <span>{usage.contracts.used}/{usage.contracts.available}</span>
                    </div>
                    <ProgressBar value={usage.contracts.used / usage.contracts.available * 100} displayPercentage/>
                    <div>
                        <h3>Wallets</h3>
                        <span>{usage.wallets.used}/{usage.wallets.available}</span>
                    </div>
                    <ProgressBar value={usage.wallets.used / usage.wallets.available * 100} displayPercentage/>
                    <div>
                        <h3>Alerts</h3>
                        <span>{usage.alerts.used}/{usage.alerts.available}</span>
                    </div>
                    <ProgressBar value={usage.alerts.used / usage.alerts.available * 100} displayPercentage/>
                </div>
            </PanelContent>
        </Panel>
    );
};

export default ProjectPlanUsage;
