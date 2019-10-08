import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {UsernameStatusMap} from "../../Common/constants";

import {authActions} from "../../Core/actions";

import {Form, Input, Panel, PanelContent, Button, PanelHeader} from "../../Elements";
import {UsernameStatusInfo} from "../index";

import './SetupAccountInvitationForm.scss';

class SetupAccountInvitationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatedPassword: '',
            usernameStatus: UsernameStatusMap.UNKNOWN,
        };
    }

    handleUsernameChange = async (field, value) => {
        this.setState({
            username: value,
        });

        await this.checkIfValidUsername(value);
    };

    checkIfValidUsername = async () => {

    };

    isFormValid = () => {
        const {username, password, repeatedPassword, usernameStatus} = this.state;

        if (repeatedPassword !== password) return false;

        if (!username || usernameStatus !== UsernameStatusMap.VALID) return false;

        return true;
    };

    handleFormSubmit = () => {

    };

    render() {
        const {username, password, repeatedPassword, usernameStatus} = this.state;

        return (
            <Panel className="SetupAccountInvitationForm">
                <PanelHeader>
                    <h3>Finish Account Setup</h3>
                </PanelHeader>
                <PanelContent>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Input field="username" label="Username" value={username} icon="user" onChange={this.handleUsernameChange} />
                        {usernameStatus !== UsernameStatusMap.UNKNOWN && <UsernameStatusInfo status={usernameStatus}/>}
                        <Input autoFocus type="password" field="password" value={password} onChange={this.handleFormUpdate} label="New password"/>
                        <Input type="password" field="repeatedPassword" value={repeatedPassword} onChange={this.handleFormUpdate} label="Repeat new password"/>
                        <div>
                            <Button type="submit" disabled={!this.isFormValid()}>
                                <span>Create Account</span>
                            </Button>
                        </div>
                    </Form>
                </PanelContent>
            </Panel>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(SetupAccountInvitationForm);
