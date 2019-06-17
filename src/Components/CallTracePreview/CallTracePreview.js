import React from 'react';
import PropTypes from 'prop-types';

import TracePreview from "../TracePreview/TracePreview";

import './CallTracePreview.scss';

const CallTracePreview = ({callTrace, contract}) => {
    return (
        <div className="CallTracePreview">
            <TracePreview trace={callTrace.trace} depth={0} open={true} contract={contract}/>
        </div>
    );
};

CallTracePreview.propTypes = {
    callTrace: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default CallTracePreview;
