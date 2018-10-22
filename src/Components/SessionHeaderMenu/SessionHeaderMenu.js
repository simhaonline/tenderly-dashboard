import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Button} from "../../Elements";

class SessionHeaderMenu extends Component {
    handleLogoutUser = () => {
        const {actions} = this.props;

        actions.logoutUser();
    };
    render() {
        const {auth} = this.props;

        if (!auth.retrievedToken) return null;

        if (!auth.loggedIn && !auth.token) {
            return (
                <div>
                    <Button to="/login">
                        login
                    </Button>
                    <Button>
                        Request early access
                    </Button>
                </div>
            )
        }

        const {user, loggedIn} = auth;

        if (!loggedIn) return null;

        return (
            <div className="asd">
                <div>{user.getFullName()}</div>
                <div><a onClick={this.handleLogoutUser}>Logout</a></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SessionHeaderMenu);

