import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TracePreview from "../TracePreview/TracePreview";

import './CallTracePreview.scss';

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

    render() {
        const {callTrace, contracts} = this.props;
        const {currentHovered} = this.state;

        return (
            <div className="CallTracePreview">
                <TracePreview trace={callTrace.trace} depth={0} open={true} focused={currentHovered} onFocusChange={this.setCurrentTrace} contracts={contracts}/>
            </div>
        );
    }
}

CallTracePreview.propTypes = {
    callTrace: PropTypes.object.isRequired,
    contracts: PropTypes.array.isRequired,
};

export default CallTracePreview;
