import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Icon} from '../../Elements';
import CodePreview from "../CodePreview/CodePreview";

import './TracePreview.scss';

class TracePreview extends Component {
    constructor(props) {
        super(props);

        const {open, contracts, trace} = props;

        const traceContract = contracts.find(contract => contract.address === trace.contract);

        this.state = {
            open,
            collapsed: false,
            file: traceContract ? traceContract.getFileById(trace.fileId) : null,
        };
    }

    togglePreview = () => {
        this.setState({
            open: !this.state.open,
        })
    };

    toggleCollapse = (event) => {
        const {trace} = this.props;

        if (!trace.calls) {
            return;
        }

        event.stopPropagation();
        this.setState({
            collapsed: !this.state.collapsed,
        })
    };

    handleMouseEnter = () => {
        const {onFocusChange, depth, trace} = this.props;

        if (onFocusChange && depth !== 0) {
            onFocusChange(trace.depthId);
        }
    };

    handleMouseLeave = () => {
        const {onFocusChange, depth} = this.props;

        if (onFocusChange && depth !== 0) {
            onFocusChange(null);
        }
    };

    render() {
        const {trace, depth, contracts, focused, onFocusChange} = this.props;
        const {open, collapsed, file} = this.state;

        return (
            <div className="TracePreview">
                <div onClick={this.togglePreview} className={classNames(
                    "TracePreviewHeading",
                    {
                        "Focused": !!focused && focused.startsWith(`${trace.depthId}.`),
                        "Blurred": !!focused && !focused.startsWith(`${trace.depthId}.`) && trace.depthId !== focused,
                    }
                )} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    {!!depth && [...Array(depth)].map((e, index) => <div key={index} className="TracePointDepthLine"/>)}
                    <div className={classNames(
                        "TracePointDot",
                        {
                            "Collapsible": !!trace.calls,
                            "Collapsed": collapsed,
                        }
                    )} onClick={this.toggleCollapse}>
                        {!!trace.calls && <Icon icon={collapsed ? "plus": "minus"} className="TraceExpandIcon"/>}
                    </div>
                    {!!file && <div>
                        {!!trace.functionName && <span className="BoldedText">{trace.functionName}</span>}
                        {!trace.functionName && <span className="BoldedText">[{trace.op}]</span>}
                        <span className="MutedText"> in {file.name}:{trace.lineNumber}</span>
                    </div>}
                    {!file && <div>
                        <span className="SemiBoldText">[{trace.op}]</span>
                        <span className="MutedText"> invoked in </span>
                        <span className="SemiBoldText">{trace.contract}</span>
                    </div>}
                    <div className="ExpandCode">
                        Show Source Code
                    </div>
                </div>
                {open && <div className="TracePreviewCodeWrapper">
                    {!!file && <CodePreview line={trace.lineNumber} linePreview={5} file={file} isExpandable/>}
                    {!file && <span>No source for this contract exists</span>}
                </div>}
                {!collapsed && !!trace.calls && trace.calls.map((trace, index) =>
                    <TracePreview trace={trace} key={index} depth={depth + 1} contracts={contracts} focused={focused} onFocusChange={onFocusChange}/>
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
