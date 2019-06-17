import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelContent, PanelHeader} from "../../Elements";

class CallTraceFlameGraph extends Component {
    render() {
        const {callTrace} = this.props;

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

CallTraceFlameGraph.propTypes = {
    callTrace: PropTypes.object.isRequired,
};

export default CallTraceFlameGraph;
