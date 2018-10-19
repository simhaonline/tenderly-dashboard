import React, {Component} from 'react';

import Code from "../Code/Code";

import './EventStackTracePoint.css';

class EventStackTracePoint extends Component {
    constructor(props) {
        super(props);

        const {open} = this.props;

        this.state = {
            open: open || false,
            expanded: false,
        };
    }

    handleExpandToggle = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    };

    render() {
        const {point, source} = this.props;
        const {expanded} = this.state;

        const linesVisible = expanded ? 10 : 5;

        return (
            <div className="EventStackTracePoint">
                {point.code}
                <Code line={point.line} linePreview={linesVisible} source={source}/>
                <div onClick={this.handleExpandToggle}>Expand</div>
            </div>
        );
    }
}

export default EventStackTracePoint;
