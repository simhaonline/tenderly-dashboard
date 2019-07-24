import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';

import {Contract, CallTrace} from "../../Core/models";

import {Button, Icon, Tooltip} from "../../Elements";
import {CopyableText} from "../index";
import CodePreview from "../CodePreview/CodePreview";

import './TraceInspector.scss';

const ROOT_ICON = 'circle';
const JUMP_IN_ICON = 'corner-down-right';
const JUMP_NEXT_ICON = 'arrow-down';
// const JUMP_OUT_ICON = 'corner-left-down';
const GO_PREVIOUS_ICON = 'arrow-left';

class TraceInspector extends Component {
    constructor(props) {
        super(props);

        const callTrace = props.callTrace;

        const currentTrace = callTrace.trace;

        this.state = {
            currentStack: [{
                trace: currentTrace,
                icon: ROOT_ICON,
            }],
            flatCallTrace: this.flattenCallTrace(callTrace.trace),
            currentTrace,
        };
    }

    /**
     * @param {Trace} trace
     * @return {Object}
     */
    flattenCallTrace = (trace) => {
        let data = {
            [trace.depthId]: trace,
        };

        if (trace.calls) {
          trace.calls.forEach(childTrace => {
              Object.assign(data, this.flattenCallTrace(childTrace));
          });
        }

        return data;
    };

    canJumpIn = () => {
        const {currentTrace} = this.state;

        return currentTrace.calls && !!currentTrace.calls.length;
    };

    jumpIn = () => {
        const {currentTrace} = this.state;

        const nextTrace = currentTrace.calls[0];

        this.setState({
            currentTrace: nextTrace,
        }, this.updateStackTrace);
    };

    canGoToPrevious = () => {
        const {currentStack} = this.state;

        return currentStack.length > 1;
    };

    goToPrevious = () => {
        const {currentStack} = this.state;

        this.setState({
            currentTrace: currentStack[currentStack.length - 2].trace,
        }, this.updateStackTrace);
    };

    canGoToNext = () => {
        const {currentTrace, flatCallTrace} = this.state;

        const depths = Object.keys(flatCallTrace);

        const currentDepthIndex = depths.indexOf(currentTrace.depthId);

        return depths.length > currentDepthIndex + 1;
    };

    goToNext = () => {
        const {currentTrace, flatCallTrace} = this.state;

        const depths = Object.keys(flatCallTrace);

        const currentDepthIndex = depths.indexOf(currentTrace.depthId);

        const nextTrace = (flatCallTrace[depths[currentDepthIndex + 1]]);

        this.setState({
            currentTrace: nextTrace,
        }, this.updateStackTrace);
    };

    goToTrace = (depthId) => {
        const {flatCallTrace, currentTrace} = this.state;

        if (depthId === currentTrace.depthId) {
            return;
        }

        const nextTrace = flatCallTrace[depthId];

        this.setState({
            currentTrace: nextTrace,
        }, this.updateStackTrace);
    };

    updateStackTrace = () => {
        const {flatCallTrace, currentTrace} = this.state;

        const newTrace = [];

        const stackTraceDepths = currentTrace.depthId.split('.');

        stackTraceDepths.reduce((currentDepth, currentLevel) => {
            const joined = [...currentDepth, currentLevel];

            newTrace.push({
                trace: flatCallTrace[joined.join('.')],
                icon: currentDepth.length === 0 ? ROOT_ICON : JUMP_IN_ICON,
            });

            return joined;
        }, []);

        this.setState({
            currentStack: newTrace,
        });
    };

    render() {
        const {contracts} = this.props;
        const {currentTrace, currentStack} = this.state;

        const currentState = currentTrace.getStateJSON();

        const contract = contracts.find(contract => contract.address === currentTrace.contract);

        const hasSource = !!contract && !!contract.getFileById(currentTrace.fileId);

        return (
            <div className="TraceInspector">
                <div className="MarginBottom2">
                    {hasSource && <CodePreview line={currentTrace.lineNumber} linePreview={6} file={contract.getFileById(currentTrace.fileId)}/>}
                    {!hasSource && <div className="TraceInspector_NoSource">
                        <h5 className="TraceInspector_NoSource__Heading">No source for this contract</h5>
                        <p className="TraceInspector_NoSource__Description">Unfortunately we do not have the source code for this contract to display the exact line of code.</p>
                        <p className="TraceInspector_NoSource__Description">If you have the source code for this contract, you can add it to the project using our <a href="https://github.com/Tenderly/tenderly-cli" rel="noopener noreferrer" target="_blank">CLI tool.</a>.</p>
                        <div><CopyableText text={currentTrace.contract} onSuccessMessage="Copied contract address to clipboard"/></div>
                    </div>}
                </div>
                <div className="MarginBottom2 DisplayFlex">
                    <div id="DebuggerButton__Previous" className="MarginRight1">
                        <Button size="small" outline={!this.canGoToPrevious()} disabled={!this.canGoToPrevious()} onClick={this.goToPrevious}>
                            <Icon icon={GO_PREVIOUS_ICON}/>
                        </Button>
                    </div>
                    <div id="DebuggerButton__JumpIn" className="MarginRight1">
                        <Button size="small" outline={!this.canJumpIn()} disabled={!this.canJumpIn()} onClick={this.jumpIn}>
                            <Icon icon={JUMP_IN_ICON}/>
                        </Button>
                    </div>
                    <div id="DebuggerButton__Next" className="MarginRight1">
                        <Button size="small" outline={!this.canGoToNext()} disabled={!this.canGoToNext()} onClick={this.goToNext}>
                            <Icon icon={JUMP_NEXT_ICON}/>
                        </Button>
                    </div>
                    <Tooltip showDelay={1000} id="DebuggerButton__Previous">Go to the previous step in the stack</Tooltip>
                    <Tooltip showDelay={1000} id="DebuggerButton__JumpIn">Jump into the function call</Tooltip>
                    <Tooltip showDelay={1000} id="DebuggerButton__Next">Jump to the next step in the execution</Tooltip>
                </div>
                <div className="DisplayFlex">
                    <div className="MarginRight2 TraceInspector__StateTraceWrapper">
                        {currentStack.map(stack => {
                            const stackContract = contracts.find(contract => contract.address === stack.trace.contract);

                            const stackHasSource = !!stackContract && !!stackContract.getFileById(currentTrace.fileId);

                            return (
                                <div key={stack.trace.depthId} className="TraceInspector__StateTrace" onClick={() => this.goToTrace(stack.trace.depthId)}>
                                    <Icon icon={stack.icon} className="TraceInspector__StateTrace__Icon"/>
                                    {stackHasSource && <Fragment>
                                        <span className="SemiBoldText">{stack.trace.functionName}</span>
                                        <span className="MutedText"> in </span>
                                        <span>{stackContract.getFileName()}:{stack.trace.lineNumber}</span>
                                    </Fragment>}
                                    {!stackHasSource && <span className="MutedText">{stack.trace.contract}</span>}
                                </div>
                            );
                        })}
                    </div>
                    <div className="TraceInspector__StateViewer">
                        <ReactJson src={currentState} theme="flat" enableClipboard={false} displayObjectSize={false} displayDataTypes={false} name={false}/>
                    </div>
                </div>
            </div>
        );
    }
}

TraceInspector.propTypes = {
    callTrace: PropTypes.instanceOf(CallTrace),
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
};

export default TraceInspector;
