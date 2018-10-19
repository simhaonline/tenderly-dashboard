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

    handleOpenToggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    handleExpandToggle = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    };

    render() {
        const {point, source} = this.props;
        const {expanded, open} = this.state;

        const linesVisible = expanded ? 10 : 5;

        return (
            <div className="EventStackTracePoint">
                <div className="StackTraceHeading" onClick={this.handleOpenToggle}>
                    <div className="TraceMessage">{point.code}</div>
                    <div className="TraceLineNumber">Line number: {point.line}</div>
                </div>
                {open && <div className="StackTraceCode">
                    <Code line={point.line} linePreview={linesVisible} source={source}/>
                    <Link className="SourceLink" to={`../source?line=${point.line}`}>
                        <Icon icon="terminal" className="LinkIcon"/>
                        <span>Contract Source</span>
                    </Link>
                    <div onClick={this.handleExpandToggle} className="ExpandCodeButton">
                        <Icon icon={expanded ? 'chevrons-up' : 'chevrons-down'}/>
                    </div>
                </div>}
            </div>
        );
    }
}

export default EventStackTracePoint;
