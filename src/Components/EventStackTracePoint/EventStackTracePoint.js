import React, {Component} from 'react';

import {Icon} from "../../Elements";
import CodePreview from "../CodePreview/CodePreview";

import './EventStackTracePoint.scss';
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
                {point.opCode !== 'CALL' && <div className="StackTracePointHeading Clickable" onClick={this.handleOpenToggle}>
                    <Icon icon="circle" className="PointIcon"/>
                    <div className="TraceMessage">{point.method} at {point.contractName}:{point.line}</div>
                </div>}
                {point.opCode === 'CALL' && <div className="StackTracePointHeading">
                    <Icon icon="arrow-right-circle" className="PointIcon"/>
                    <div className="TraceMessage">{point.contract} called {point.method}</div>
                </div>}
                {(point.belongsToContract && point.opCode !== 'CALL' && open) && <div className="StackTraceCode">
                    <CodePreview line={point.line} linePreview={linesVisible} source={source}/>
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
