import React from 'react';

import EventStackTracePoint from "../EventStackTracePoint/EventStackTracePoint";

import './EventStackTrace.css';

/**
 * @param {TracePoint[]} trace
 * @param {string} source
 * @constructor
 */
const EventStackTrace = ({trace, source}) => {
    return (
        <div className="EventStackTrace">
            <div className="EventStackTraceHeading"><h5>StackTrace</h5></div>
            {trace && trace.map((point, index) => <EventStackTracePoint open={index === 0} key={index + point.start} point={point} source={source}/>)}
        </div>
    )
};

export default EventStackTrace;
