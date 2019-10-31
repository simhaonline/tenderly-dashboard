import React, {Component} from 'react';

import {Panel, PanelHeader, Icon, PanelContent} from "../../Elements";

import './CliUsageInstructions.scss';

class CliUsageInstructions extends Component {
    render() {
        return (
            <Panel className="CliUsageInstructions">
                <PanelHeader>
                    <Icon className="MarginRight1" icon="project"/>
                    <h3>qwe</h3>
                </PanelHeader>
                <PanelContent>

                </PanelContent>
            </Panel>
        );
    }
}

export default CliUsageInstructions;
