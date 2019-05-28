import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TracePreview from "../TracePreview/TracePreview";

import './CallTracePreview.css';
import Card from "../../Elements/Card/Card";

class CallTracePreview extends Component {
    render() {
        const {callTrace, contract} = this.props;

        return (
            <Card className="CallTracePreview">
call            <TracePreview trace={callTrace.trace} depth={0} open={true} source={contract.source}/>
            </Card>
        );
    }
}

PropTypes.propTypes = {
    callTrace: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default CallTracePreview;
