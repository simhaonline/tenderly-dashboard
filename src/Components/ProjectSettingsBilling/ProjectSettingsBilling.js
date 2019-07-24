import React, {Component} from 'react';

import {Panel, PanelHeader} from "../../Elements";

class ProjectSettingsBilling extends Component {
    render() {
        return (
            <Panel className="ProjectSettingsBilling">
                <PanelHeader>
                    <h3>Billing Plan</h3>
                </PanelHeader>
            </Panel>
        );
    }
}

export default ProjectSettingsBilling;
