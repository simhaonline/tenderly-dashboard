import React from 'react';
import moment from 'moment';

const TimeAgoColumn = ({timestamp}) => {
    return (
        <div className="TimeAgoColumn">
            {moment(timestamp).fromNow()}
        </div>
    )
};

export default TimeAgoColumn;
