import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import md5 from "md5";
import classNames from 'classnames';

import * as authActions from "../../Core/Auth/Auth.actions";

import FeedbackDialog from "../FeedbackDialog/FeedbackDialog";
import SupportDialog from "../SupportDialog/SupportDialog";

import './SessionHeaderMenu.css';

class SessionHeaderMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            feedbackDialogOpen: false,
            supportDialogOpen: false,
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

    openFeedbackDialog = () => {
        this.setState({
            feedbackDialogOpen: true,
        });
    };

    openSupportDialog = () => {
        this.setState({
            supportDialogOpen: true,
        });
    };

    handleDialogClose = () => {
        this.setState({
            feedbackDialogOpen: false,
            supportDialogOpen: false,
        });
    };

    render() {
        const {auth} = this.props;
        const {dropdownOpen, feedbackDialogOpen, supportDialogOpen} = this.state;

        if (!auth.retrievedToken) return null;

        if (!auth.loggedIn && !auth.token) {
            return null;
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
                    <div className="ProfileDropdown" onClick={this.handleDropdownToggle}>
                        <Link className="DropdownItem" to={'/account'}>Account</Link>
                        <div className="DropdownItem" onClick={this.openFeedbackDialog}>Give feedback</div>
                        <div className="DropdownItem" onClick={this.openSupportDialog}>Contact support</div>
                        <div className="DropdownItem" onClick={this.handleLogoutUser}>Logout</div>
                    </div>
                </div>
                <FeedbackDialog open={feedbackDialogOpen} onClose={this.handleDialogClose}/>
                <SupportDialog open={supportDialogOpen} onClose={this.handleDialogClose}/>
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

