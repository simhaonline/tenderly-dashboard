import React, {Component} from 'react';

import {Icon} from "../../Elements";
import Code from "../Code/Code";

import './EventStackTracePoint.css';
import {Link} from "react-router-dom";

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
                <div className="StackTraceCode">
                    <Code line={point.line} linePreview={linesVisible} source={source}/>
                    <Link className="SourceLink" to={`../source?line=${point.line}`}>
                        <Icon icon="terminal" className="LinkIcon"/>
                        <span>Contract Source</span>
                    </Link>
                    <div onClick={this.handleExpandToggle} className="ExpandCodeButton">
                        <Icon icon={expanded ? 'chevrons-up' : 'chevrons-down'}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventStackTracePoint;
