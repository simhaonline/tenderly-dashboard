import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import md5 from "md5";
import classNames from 'classnames';

import * as authActions from "../../Core/Auth/Auth.actions";

import {Button, Icon, DialogHeader, Dialog, DialogBody} from "../../Elements";
import {EarlyAccessButton} from "../../Components";

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
            return (
                <div className="SessionHeaderMenu">
                    <Button to="/login" size="small">
                        Login
                    </Button>
                    <EarlyAccessButton size="small"/>
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
                        <div className="DropdownItem" onClick={this.openFeedbackDialog}>Give feedback</div>
                        <div className="DropdownItem" onClick={this.openSupportDialog}>Contact support</div>
                        <div className="DropdownItem" onClick={this.handleLogoutUser}>Logout</div>
                    </div>
                </div>
                <Dialog open={feedbackDialogOpen} onClose={this.handleDialogClose}>
                    <DialogHeader>
                        <h3>Give Feedback</h3>
                    </DialogHeader>
                    <DialogBody>
                        <Button outline>
                            <Icon icon="send"/>
                            <span>Send</span>
                        </Button>
                    </DialogBody>
                </Dialog>
                <Dialog open={supportDialogOpen} onClose={this.handleDialogClose}>
                    <DialogHeader>
                        <h3>Contact Support</h3>
                    </DialogHeader>
                    <DialogBody>
                        <div>
                            <Button outline>
                                <Icon icon="send"/>
                                <span>Send</span>
                            </Button>
                        </div>
                    </DialogBody>
                </Dialog>
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

