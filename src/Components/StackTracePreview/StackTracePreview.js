import React from 'react';
import PropTypes from 'prop-types';

import TracePreview from "../TracePreview/TracePreview";

const StackTracePreview = ({stackTrace, contract}) => {
    return (
        <div className="StackTracePreview">
            {!!stackTrace.trace && stackTrace.trace.map((trace, index) =>
                <TracePreview trace={trace} key={index} open={index === 0} depth={0} contract={contract}/>
            )}
        </div>
    );
};

StackTracePreview.propTypes = {
    stackTrace: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default StackTracePreview;
