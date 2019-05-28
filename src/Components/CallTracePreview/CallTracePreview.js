import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TracePreview from "../TracePreview/TracePreview";

class CallTracePreview extends Component {
    render() {
        const {callTrace, contract} = this.props;

        return (
            <div>
call            <TracePreview trace={callTrace.trace} depth={0} open={true} source={contract.source}/>
            </div>
        );
    }
}

PropTypes.propTypes = {
    callTrace: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default CallTracePreview;
