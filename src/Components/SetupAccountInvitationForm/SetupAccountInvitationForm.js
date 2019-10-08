import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import _ from "lodash";

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

    handlePasswordFieldChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    /**
     * @param {string} username
     */
    checkIfValidUsername = _.debounce(async (username) => {
        const {authActions} = this.props;

        this.setState({
            usernameStatus: UsernameStatusMap.VALIDATING,
        });

        const response = await authActions.validateUsername(username);

        if (response.success) {
            this.setState({
                usernameStatus: response.data.status,
            });
        } else {
            this.setState({
                usernameStatus: UsernameStatusMap.UNKNOWN,
            });
        }
    }, 1000);

    isFormValid = () => {
        const {username, password, repeatedPassword, usernameStatus} = this.state;

        if (repeatedPassword !== password) return false;

        if (!username || usernameStatus !== UsernameStatusMap.VALID) return false;

        return password.length > 3;
    };

    handleFormSubmit = () => {
        const {onSubmit} = this.props;
        const {username, password} = this.state;

        if (!this.isFormValid) return;

        onSubmit({
            username,
            password,
        });
    };

    render() {
        const {username, password, repeatedPassword, usernameStatus} = this.state;
        const {inProgress} = this.props;

        return (
            <Panel className="SetupAccountInvitationForm">
                <PanelHeader>
                    <h3>Finish Account Setup</h3>
                </PanelHeader>
                <PanelContent>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Input autoFocus readOnly={inProgress} field="username" label="Username" value={username} icon="user" onChange={this.handleUsernameChange} />
                        {usernameStatus !== UsernameStatusMap.UNKNOWN && <UsernameStatusInfo status={usernameStatus}/>}
                        <Input readOnly={inProgress} icon="lock" type="password" field="password" value={password} onChange={this.handlePasswordFieldChange} label="New password"/>
                        <Input readOnly={inProgress} icon="lock" type="password" field="repeatedPassword" value={repeatedPassword} onChange={this.handlePasswordFieldChange} label="Repeat new password"/>
                        <div>
                            <Button type="submit" disabled={!this.isFormValid() || inProgress}>
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
