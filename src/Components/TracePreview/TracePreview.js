import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Icon, Card} from '../../Elements';
import CodePreview from "../CodePreview/CodePreview";

import './TracePreview.scss';

class TracePreview extends Component {
    constructor(props) {
        super(props);

        const {open, contracts, trace} = props;

        const traceContract = contracts.find(contract => contract.address === trace.contract);

        this.state = {
            open,
            file: traceContract ? traceContract.getFileById(trace.fileId) : null,
        };
    }

    togglePreview = () => {
        this.setState({
            open: !this.state.open,
        })
    };

    render() {
        const {trace, depth, contracts} = this.props;
        const {open, file} = this.state;

        console.log(trace);

        return (
            <div className="TracePreview">
                <div onClick={this.togglePreview} className={classNames(
                    "TracePreviewHeading",
                    `Depth${depth}`,
                )}>
                    <Icon icon="circle" className={classNames(
                        "TracePointIcon MarginRight1",
                        {
                            "NoSource": !file,
                        }
                    )}/>
                    {!!file && <div>
                        {!!trace.functionName && <span className="BoldedText">{trace.functionName}</span>}
                        {!trace.functionName && <span className="BoldedText">[{trace.op}]</span>}
                        <span className="MutedText"> in {file.name}:{trace.lineNumber}</span>
                    </div>}
                    {!file && <div>
                        <span className="SemiBoldText">{trace.contract}</span><span className="MutedText"> at line {trace.lineNumber}</span>
                    </div>}
                </div>
                {open && <div className="TracePreviewCodeWrapper">
                    {!!file && <CodePreview line={trace.lineNumber} linePreview={5} file={file} isExpandable/>}
                    {!file && <span>No source for this contract exists</span>}
                    {!!file && (trace.inputVariables || trace.outputVariables) && <Card className="TraceInputs">
                        {trace.inputVariables && <div className="MarginBottom2">
                            <div className="SemiBoldText MarginBottom1">Input</div>
                            {trace.inputVariables.map((variable, index) => (
                                <div key={index} className="InputVariable MarginBottom1">
                                    <span className="VariableName">{variable.name}</span>
                                    <span className="VariableValue">{variable.value}</span>
                                </div>
                            ))}
                        </div>}
                        {trace.outputVariables && <div>
                            <div className="SemiBoldText MarginBottom1">Output</div>
                            {trace.outputVariables.map((variable, index) => (
                                <div key={index} className="InputVariable MarginBottom1">
                                    <span className="VariableName">{variable.name}</span>
                                    <span className="VariableValue">{variable.value}</span>
                                </div>
                            ))}
                        </div>}
                    </Card>}
                </div>}
                {!!trace.calls && trace.calls.map((trace, index) =>
                    <TracePreview trace={trace} key={index} depth={depth + 1} contracts={contracts}/>
                )}
            </div>
        );
    }
}

PropTypes.propTypes = {
    trace: PropTypes.object.isRequired,
    depth: PropTypes.number.isRequired,
    contracts: PropTypes.array.isRequired,
    open: PropTypes.bool,
};

PropTypes.defaultProps = {
    open: false,
};

export default TracePreview;
