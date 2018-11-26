import {Component} from 'react';
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

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
};

export default connect(
    mapStateToProps,
    null,
)(FeatureFlag);
