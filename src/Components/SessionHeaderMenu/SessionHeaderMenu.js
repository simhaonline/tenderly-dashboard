import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import md5 from "md5";
import classNames from 'classnames';

import * as authActions from "../../Core/Auth/Auth.actions";

import {Button} from "../../Elements";

import './SessionHeaderMenu.css';

class SessionHeaderMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
        };
    }
    handleLogoutUser = () => {
        const {actions} = this.props;

        actions.logoutUser();

        this.setState({
            dropdownOpen: false,
        });
    };

    handleDropdownToggle = () => {
        const {dropdownOpen} = this.state;

        this.setState({
            dropdownOpen: !dropdownOpen,
        });
    };

    render() {
        const {auth} = this.props;
        const {dropdownOpen} = this.state;

        if (!auth.retrievedToken) return null;

        if (!auth.loggedIn && !auth.token) {
            return (
                <div className="SessionHeaderMenu">
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

        const avatarHash = md5(user.email);

        return (
            <div className="SessionHeaderMenu">
                <div className={classNames(
                    "UserProfileMenu",
                    {
                        "OpenDropdown": dropdownOpen,
                    }
                )}>
                    <div className="ProfileInfo" onClick={this.handleDropdownToggle}>
                        <img src={`https://www.gravatar.com/avatar/${avatarHash}?s=32`} alt="User Avatar" className="UserAvatar"/>
                        <div className="UserInfo">
                            <div className="UserFullName">{user.getFullName()}</div>
                            <div className="UserEmail">{user.email}</div>
                        </div>
                    </div>
                    <div className="ProfileDropdown">
                        <a className="DropdownItem" onClick={this.handleLogoutUser}>Logout</a>
                    </div>
                </div>
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

