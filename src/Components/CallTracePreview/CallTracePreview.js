import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Icon} from "../../Elements";

import './CallTracePreview.scss';
import CodePreview from "../CodePreview/CodePreview";

class TracePoint extends Component {
    constructor(props) {
        super(props);

        const {contracts, trace} = props;

        const traceContract = contracts.find(contract => contract.address === trace.contract);

        const file = traceContract ? traceContract.getFileById(trace.fileId) : null;

        this.state = {
            file,
        };
    }

    handleOpenTrace = () => {
        const {trace, onTraceOpen} = this.props;
        const {file} = this.state;

        if (!file) {
            return;
        }

        onTraceOpen(trace);
    };

    render() {

        const {trace, depth, contracts, onDebuggerView, onSourceView, openTrace, onTraceOpen} = this.props;
        const {file} = this.state;

        const isOpen = openTrace === trace.depthId;

        return (
            <div className="CallTracePreview__TracePoint">
                <div className={classNames(
                    "CallTracePreview__TracePoint__Heading",
                    {
                        "CursorPointer": !!file,
                        "CallTracePreview__TracePoint__Heading--Open": isOpen,
                    },
                )} onClick={this.handleOpenTrace}>
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
                {isOpen && <div className="CallTracePreview__TracePoint__SourceWrapper">
                    <CodePreview line={trace.lineNumber} linePreview={5} file={file}/>
                </div>}
                {!!trace.calls && trace.calls.map((trace, index) =>
                    <TracePoint trace={trace} key={index} onDebuggerView={onDebuggerView} openTrace={openTrace} onSourceView={onSourceView} depth={depth + 1} contracts={contracts} onTraceOpen={onTraceOpen}/>
                )}
            </div>
        );
    }
}

class CallTracePreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentHovered: null,
            openedTrace: '0',
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

    handleOpenTraceSource = (trace) => {
        this.setState({
            openedTrace: trace.depthId,
        });
    };

    render() {
        const {callTrace, contracts} = this.props;
        const {currentHovered, openedTrace} = this.state;

        return (
            <div className="CallTracePreview">
                <TracePoint trace={callTrace.trace} onDebuggerView={this.goToDebugger} openTrace={openedTrace} onSourceView={this.goToSource} depth={0} open={false} focused={currentHovered} onFocusChange={this.setCurrentTrace} contracts={contracts} onTraceOpen={this.handleOpenTraceSource}/>
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
