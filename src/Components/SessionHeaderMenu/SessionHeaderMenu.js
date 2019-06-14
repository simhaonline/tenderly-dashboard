import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import md5 from "md5";
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

import * as authActions from "../../Core/Auth/Auth.actions";

import FeedbackDialog from "../FeedbackDialog/FeedbackDialog";
import SupportDialog from "../SupportDialog/SupportDialog";

import './SessionHeaderMenu.scss';

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

    closeDropdown = () => {
        this.setState({
            dropdownOpen: false,
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
                <FeedbackDialog open={feedbackDialogOpen} onClose={this.handleDialogClose} user={user}/>
                <SupportDialog open={supportDialogOpen} onClose={this.handleDialogClose} user={user}/>
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

