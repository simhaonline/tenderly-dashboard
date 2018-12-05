import {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

class FeatureFlag extends Component {
    render() {
        const {user, children} = this.props;


        if (!user.email || !user.email.includes('@tenderly.app')) {
            return null;
        }

        return children;
    }
}

FeatureFlag.propTypes = {
    flag: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
};

export default connect(
    mapStateToProps,
    null,
)(FeatureFlag);
