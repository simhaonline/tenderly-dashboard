import {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

class FeatureFlag extends Component {
    render() {
        const {children, flags, flag, reverse} = this.props;

        if (!reverse === !flags[flag]) {
            return null;
        }

        return children;
    }
}

FeatureFlag.propTypes = {
    flag: PropTypes.string.isRequired,
    reverse: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        flags: state.featureFlag.flags,
    }
};

export default connect(
    mapStateToProps,
    null,
)(FeatureFlag);
