import React from 'react';
import PropTypes from 'prop-types';

import TracePreview from "../TracePreview/TracePreview";

import './StackTracePreview.scss';

const StackTracePreview = ({stackTrace, contracts}) => {
    return (
        <div className="StackTracePreview">
            {!!stackTrace && !!stackTrace.trace && stackTrace.trace.map((trace, index) =>
                <TracePreview trace={trace} key={index} open={index === 0} depth={0} contracts={contracts}/>
            )}
        </div>
    );
};

StackTracePreview.propTypes = {
    stackTrace: PropTypes.object.isRequired,
    contracts: PropTypes.array.isRequired,
};

export default StackTracePreview;
