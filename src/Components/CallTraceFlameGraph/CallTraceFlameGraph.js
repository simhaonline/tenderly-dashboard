import React, {Component} from 'react';

import {Panel, PanelContent, PanelHeader} from "../../Elements";

class CallTraceFlameGraph extends Component {
    render() {
        return (
            <Panel>
                <PanelHeader>
                    <h3>Gas Breakdown</h3>
                </PanelHeader>
                <PanelContent>
                    Flame graph will go here
                </PanelContent>
            </Panel>
        );
    }
}

export default CallTraceFlameGraph;
