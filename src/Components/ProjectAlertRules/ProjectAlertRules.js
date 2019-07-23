import React, {Component} from 'react';

import {Button, Icon, Panel, PanelContent, PanelHeader} from "../../Elements";

class ProjectAlertRules extends Component {
    render() {
        return (
            <Panel>
                <PanelHeader>
                    <h3>Rules</h3>
                    <div className="MarginLeftAuto">`
                        <Button size="small">
                            <Icon icon="plus"/>
                            <span>Create Rule</span>
                        </Button>
                    </div>
                </PanelHeader>
                <PanelContent>
                    asd
                </PanelContent>
            </Panel>
        );
    }
}

export default ProjectAlertRules;
