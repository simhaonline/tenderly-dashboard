import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {CardHeading, Card} from "../../Elements";

import TracePreview from "../TracePreview/TracePreview";

import './CallTracePreview.css';

class CallTracePreview extends Component {
    render() {
        const {callTrace, contract} = this.props;

        return (
            <Card className="CallTracePreview">
                <CardHeading>
                    <h3>Call Trace</h3>
                </CardHeading>
                <TracePreview trace={callTrace.trace} depth={0} open={true} contract={contract}/>
            </Card>
        );
    }
}

PropTypes.propTypes = {
    callTrace: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default CallTracePreview;
