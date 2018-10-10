import React, {Component} from 'react';
import hljs from "highlight.js";
import hljsDefineSolidity from "highlightjs-solidity";

import './EventStackTracePoint.css';

hljsDefineSolidity(hljs);
hljs.initHighlightingOnLoad();

class PointCode extends Component {
    state = {
        ref: React.createRef(),
    };
    componentDidMount() {
        hljs.highlightBlock(this.state.ref.current);
    }
    render() {
        const {source, lineNumber} = this.props;

        const lineNumbers = [];

        for (let i = lineNumber - 5; i <= lineNumber + 5; i++) {
            lineNumbers.push({number: i, active: i === lineNumber});
        }

        const topProp = (lineNumber - 6) * - 21;

        return (
            <div className="PointCodeWrapper">
                <div className="StackLines">
                    {lineNumbers.map(num =>
                        <div key={num.number} className={`StackLine ${num.active? 'active': ''}`}>{num.number}</div>
                    )}
                </div>
                <pre className="StackCode" ref={this.state.ref} style={{
                    top: `${topProp}px`,
                }}>
                    {source}
                </pre>
            </div>
        )
    }
}

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
                <PointCode lineNumber={point.line} source={source}/>
            </div>
        );
    }
}

export default EventStackTracePoint;
