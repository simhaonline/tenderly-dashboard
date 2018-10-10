import React from 'react';

import './EventStackTrace.css';
import EventStackTracePoint from "../EventStackTracePoint/EventStackTracePoint";

const EventStackTrace = ({trace, source}) => {
    console.log(trace);
    return (
        <div className="EventStackTrace">
            trace
            {trace.map((point, index) => <EventStackTracePoint open={index === 0} key={point.start} point={point} source={source}/>)}
        </div>
    )
};

export default EventStackTrace;
