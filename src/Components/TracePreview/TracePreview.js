import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CodePreview from "../CodePreview/CodePreview";

import './TracePreview.scss';

class TracePreview extends Component {
    constructor(props) {
        super(props);

        const {open, contract, trace} = props;

        this.state = {
            open,
            file: contract.getFileById(trace.fileId),
        };
    }

    togglePreview = () => {
        this.setState({
            open: !this.state.open,
        })
    };

    render() {
        const {trace, depth, contract} = this.props;
        const {open, file} = this.state;

        return (
            <div className="TracePreview">
                <div onClick={this.togglePreview} className={classNames(
                    "TracePreviewHeading",
                    `Depth${depth}`,
                )}>
                    <span className="BoldedText">{trace.functionName}</span> {!!file && <span className="MutedText">in {file.name}:{trace.lineNumber}</span>}
                </div>
                {open && <div className="TracePreviewCodeWrapper">
                    {!!file && <CodePreview line={trace.lineNumber} linePreview={5} file={file}/>}
                </div>}
                {!!trace.calls && trace.calls.map((trace, index) =>
                    <TracePreview trace={trace} key={index} depth={depth + 1} contract={contract}/>
                )}
            </div>
        );
    }
}

PropTypes.propTypes = {
    trace: PropTypes.object.isRequired,
    depth: PropTypes.number.isRequired,
    contract: PropTypes.object.isRequired,
    open: PropTypes.bool,
};

PropTypes.defaultProps = {
    open: false,
};

export default TracePreview;
