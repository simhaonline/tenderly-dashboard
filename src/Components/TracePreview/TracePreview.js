import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CodePreview from "../CodePreview/CodePreview";

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
            <div>
                <div onClick={this.togglePreview}>
                    {depth} -  trace {trace.lineNumber}
                </div>
                {open && <div>
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
