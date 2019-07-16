import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import md5 from "md5";
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

import * as authActions from "../../Core/Auth/Auth.actions";
import Intercom from '../../Utils/Intercom';

import './SessionHeaderMenu.scss';

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

    closeDropdown = () => {
        this.setState({
            dropdownOpen: false,
        });
    };

    openFeedbackDialog = () => {
        Intercom.openNewConversation();
    };

    openSupportDialog = () => {
        Intercom.openNewConversation();
    };

    render() {
        const {auth} = this.props;
        const {dropdownOpen} = this.state;

        if (!auth.retrievedToken) return null;

        if (!auth.loggedIn && !auth.token) {
            return null;
        }

        const {user, loggedIn} = auth;

        if (!loggedIn) return null;

        const avatarHash = md5(user.email);

        const userHasName = !!user.getFullName().trim();

        return (
            <div className="SessionHeaderMenu">
                <OutsideClickHandler onOutsideClick={this.closeDropdown}>
                    <div className={classNames(
                        "UserProfileMenu",
                        {
                            "OpenDropdown": dropdownOpen,
                        }
                    )}>
                        <div className="ProfileInfo" onClick={this.handleDropdownToggle}>
                            <img src={`https://www.gravatar.com/avatar/${avatarHash}?s=32&d=identicon`} alt="User Avatar" className="UserAvatar"/>
                            <div className="UserInfo">
                                {userHasName && <div className="UserFullName">{user.getFullName()}</div>}
                                {!userHasName && <div className="UserFullName">{user.username}</div>}
                                <div className="UserEmail">{user.email}</div>
                            </div>
                        </div>
                        <div className="ProfileDropdown" onClick={this.handleDropdownToggle}>
                            <Link className="DropdownItem" to={'/account'}>Account</Link>
                            <div className="DropdownItem" onClick={this.openFeedbackDialog}>Give feedback</div>
                            <div className="DropdownItem" onClick={this.openSupportDialog}>Contact support</div>
                            <div className="DropdownItem" onClick={this.handleLogoutUser}>Logout</div>
                        </div>
                    </div>
                </OutsideClickHandler>
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

