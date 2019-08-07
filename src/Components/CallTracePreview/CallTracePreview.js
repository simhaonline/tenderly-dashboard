import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Icon} from "../../Elements";

import './CallTracePreview.scss';

const TracePoint = ({trace, depth, contracts, onDebuggerView, onSourceView}) => {
    const traceContract = contracts.find(contract => contract.address === trace.contract);

    const file = traceContract ? traceContract.getFileById(trace.fileId) : null;

    return <div className="CallTracePreview__TracePoint">
        <div className="CallTracePreview__TracePoint__Heading">
            {!!depth && [...Array(depth)].map((e, index) => <div key={index} className="CallTracePreview__TracePoint__DepthLine"/>)}
            <div className="CallTracePreview__TracePoint__Dot"/>
            {!!file && <div>
                {!!trace.functionName && <span className="SemiBoldText">{trace.functionName}</span>}
                {!trace.functionName && <span className="SemiBoldText">[{trace.op}]</span>}
                <span className="MutedText"> in {file.name}:{trace.lineNumber}</span>
            </div>}
            {!file && <div>
                <span className="SemiBoldText">[{trace.op}]</span>
                <span className="MutedText"> from </span>
                <span className="SemiBoldText">{trace.contract}</span>
            </div>}
            <div className="CallTracePreview__TracePoint__Actions">
                {!!file && <div className="CallTracePreview__TracePoint__Action" onClick={() => onSourceView(trace)}>
                    <Icon icon="file-text"/>
                    <span>View source</span>
                </div>}
                <div className="CallTracePreview__TracePoint__Action" onClick={() => onDebuggerView(trace)}>
                    <Icon icon="terminal"/>
                    <span>View in Debugger</span>
                </div>
            </div>
        </div>
        {!!trace.calls && trace.calls.map((trace, index) =>
            <TracePoint trace={trace} key={index} onDebuggerView={onDebuggerView} depth={depth + 1} contracts={contracts}/>
        )}
    </div>
};

class CallTracePreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentHovered: null,
        }
    }

    setCurrentTrace = (depthId) => {
        this.setState({
            currentHovered: depthId,
        });
    };

    goToDebugger = (trace) => {
        const {onDebuggerView} = this.props;

        onDebuggerView(trace);
    };

    goToSource = (trace) => {
        const {onSourceView} = this.props;

        onSourceView(trace);
    };

    render() {
        const {callTrace, contracts} = this.props;
        const {currentHovered} = this.state;

        return (
            <div className="CallTracePreview">
                <TracePoint trace={callTrace.trace} onDebuggerView={this.goToDebugger} onSourceView={this.goToSource} depth={0} open={false} focused={currentHovered} onFocusChange={this.setCurrentTrace} contracts={contracts}/>
            </div>
        );
    }
}

CallTracePreview.propTypes = {
    callTrace: PropTypes.object.isRequired,
    contracts: PropTypes.array.isRequired,
    onDebuggerView: PropTypes.func.isRequired,

};

export default CallTracePreview;
