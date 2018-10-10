import React, {Component} from 'react';

import './EventStackTracePoint.css';

class EventStackTracePoint extends Component {
    constructor(props) {
        super(props);

        const {open} = this.props;

        this.state = {
            open: open || false,
        };
    }

    render() {
        const {point, source} = this.props;
        const {open} = this.state;

        console.log(open);

        return (
            <div className="EventStackTracePoint">
                {point.code}
                <pre>
                    {source}
                </pre>
            </div>
        );
    }
}

export default EventStackTracePoint;
