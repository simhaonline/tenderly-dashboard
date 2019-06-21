import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelContent, PanelHeader} from "../../Elements";

import './CallTraceFlameGraph.scss';

class FlameGraphRow extends Component{
    render() {
        const {trace, width} = this.props;

        return (
            <div className="FlameGraphRow" style={{
                width: width ? `${width * 100}%` : '100%',
            }}>
                <div className="FlameGraphRow__RowInfo">{trace.gasUsed} Gwei</div>
                {!!trace.calls && !!trace.calls.length && <div className="FlameGraphRow__SubRows">
                    {trace.calls.map(call => (
                        call.gasUsed > 0 ? <FlameGraphRow key={call.lineNumber} width={call.gasUsed / trace.gasUsed} trace={call}/> : null))}
                </div>}
            </div>
        )
    }
}

class CallTraceFlameGraph extends Component {
    render() {
        const {callTrace} = this.props;

        return (
            <Panel>
                <PanelHeader>
                    <h3>Gas Breakdown</h3>
                </PanelHeader>
                <PanelContent>
                    <FlameGraphRow trace={callTrace.trace}/>
                </PanelContent>
            </Panel>
        );
    }
}

CallTraceFlameGraph.propTypes = {
    callTrace: PropTypes.object.isRequired,
};

export default CallTraceFlameGraph;
