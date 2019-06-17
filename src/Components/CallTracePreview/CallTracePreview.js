import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {PanelHeader, PanelContent, Panel} from "../../Elements";

import TracePreview from "../TracePreview/TracePreview";

class CallTracePreview extends Component {
    render() {
        const {callTrace, contract} = this.props;

        return (
            <Panel className="CallTracePreview">
                <PanelHeader>
                    <h3>Call Trace</h3>
                </PanelHeader>
                <PanelContent>
                    <TracePreview trace={callTrace.trace} depth={0} open={true} contract={contract}/>
                </PanelContent>
            </Panel>
        );
    }
}

PropTypes.propTypes = {
    callTrace: PropTypes.object.isRequired,
    transaction: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default CallTracePreview;
