import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Icon} from "../../Elements";

import './CallTracePreview.scss';
import CodePreview from "../CodePreview/CodePreview";
import {generateShortAddress} from "../../Utils/AddressFormatter";

class TracePoint extends Component {
    constructor(props) {
        super(props);

        const {contracts, trace} = props;

        const traceContract = contracts[trace.contract];

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

        const fromContract = contracts[trace.from] ? contracts[trace.from].name : generateShortAddress(trace.from, 10, 6);
        const toContract = contracts[trace.to] ? contracts[trace.to].name : generateShortAddress(trace.to, 10, 6);

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
                    <div className="CallTracePreview__TracePoint__Dot">
                        {!trace.hasErrored && !!file && <Icon icon="file-text" className="CallTracePreview__TracePoint__Dot__HasSourceIcon"/>}
                        {!trace.hasErrored && !file && <Icon icon="circle" className="CallTracePreview__TracePoint__Dot__NoSourceIcon"/>}
                        {trace.hasErrored && <Icon icon="alert-triangle" className="CallTracePreview__TracePoint__Dot__HasErroredIcon"/>}
                    </div>
                    {!!file && <div>
                        {!!trace.functionName && <span className="SemiBoldText">{trace.functionName}</span>}
                        {!trace.functionName && <span className="SemiBoldText">[{trace.op}]</span>}
                        <span className="MutedText"> in {file.name}:{trace.lineNumber}</span>
                    </div>}
                    {!file && <div>
                        {trace.depthId === '0' && <Fragment>
                            <span className="SemiBoldText">{trace.functionName ? trace.functionName : `[${trace.op}]`}</span>
                            <span className="MutedText"> {trace.functionName ? 'in' : `to`} </span>
                            <span className="SemiBoldText">{trace.contract}</span>
                        </Fragment>}
                        {trace.depthId !== '0' && <Fragment>
                            <span className="SemiBoldText">{trace.functionName ? trace.functionName : `[${trace.op}]`}</span>
                            <span className="MutedText"> from </span>
                            <span className="SemiBoldText">{fromContract}</span>
                            <span className="MutedText"> to </span>
                            <span className="SemiBoldText">{toContract}</span>
                        </Fragment>}
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
                {isOpen && !!file && <div className="CallTracePreview__TracePoint__SourceWrapper">
                    <CodePreview line={trace.lineNumber} linePreview={5} file={file} highlightColor={trace.hasErrored ? 'danger' : ''} highlightAppend={() => {
                        if (!trace.hasErrored) return '';

                        return <span className="MarginLeft2">
                            <Icon icon="alert-triangle" className="MarginRight1"/>
                            {trace.errorMessage}
                        </span>;
                    }}/>
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
            openedTrace: '',
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
            openedTrace: trace.depthId === this.state.openedTrace ? '' : trace.depthId,
        });
    };

    render() {
        const {callTrace, contracts} = this.props;
        const {currentHovered, openedTrace} = this.state;

        const mappedContracts = contracts.reduce((map, contract) => {
            map[contract.address] = contract;

            return map;
        }, {});

        return (
            <div className="CallTracePreview">
                <TracePoint trace={callTrace.trace} onDebuggerView={this.goToDebugger} openTrace={openedTrace} onSourceView={this.goToSource} depth={0} open={false} focused={currentHovered} onFocusChange={this.setCurrentTrace} contracts={mappedContracts} onTraceOpen={this.handleOpenTraceSource}/>
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
