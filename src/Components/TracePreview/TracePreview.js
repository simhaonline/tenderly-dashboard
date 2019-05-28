import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CodePreview from "../CodePreview/CodePreview";

import './TracePreview.css';

class TracePreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
        };
    }

    togglePreview = () => {
        this.setState({
            open: !this.state.open,
        })
    };

    render() {
        const {trace, depth, source} = this.props;
        const {open} = this.state;

        return (
            <div className="TracePreview">
                <div onClick={this.togglePreview} className={classNames(
                    "TracePreviewHeading",
                    `Depth${depth}`,
                )}>
                    {depth} -  trace {trace.lineNumber}
                </div>
                {open && <div className="TracePreviewCodeWrapper">
                    <CodePreview line={trace.lineNumber} linePreview={5} source={source}/>
                </div>}
                {!!trace.calls && trace.calls.map((trace, index) =>
                    <TracePreview trace={trace} key={index} depth={depth + 1} source={source}/>
                )}
            </div>
        );
    }
}

PropTypes.propTypes = {
    trace: PropTypes.object.isRequired,
    depth: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

PropTypes.defaultProps = {
    open: false,
};

export default TracePreview;
