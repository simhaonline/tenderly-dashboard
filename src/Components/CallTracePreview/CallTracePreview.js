import React from 'react';
import PropTypes from 'prop-types';

import TracePreview from "../TracePreview/TracePreview";

import './CallTracePreview.scss';

const CallTracePreview = ({callTrace, contracts}) => {
    return (
        <div className="CallTracePreview">
            <TracePreview trace={callTrace.trace} depth={0} open={true} contracts={contracts}/>
        </div>
    );
};

CallTracePreview.propTypes = {
    callTrace: PropTypes.object.isRequired,
    contracts: PropTypes.array.isRequired,
};

export default CallTracePreview;
