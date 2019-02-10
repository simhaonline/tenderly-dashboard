import React, {Component} from 'react';
import _ from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {UsernameStatusMap} from "../../Common/constants";
import * as authActions from "../../Core/Auth/Auth.actions";

import {Card, Button, Input} from "../../Elements";
import {UsernameStatusInfo} from "../index";

import "./OnboardingSetUsernameStep.css";

class OnboardingSetUsernameStep extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            usernameStatus: UsernameStatusMap.UNKNOWN,
        };
    }

    /**
     * @param {string} username
     */
    validateUsername = _.debounce(async (username) => {
        const {actions} = this.props;

        this.setState({
            usernameStatus: UsernameStatusMap.VALIDATING,
        });

        const response = await actions.validateUsername(username);

        if (response.success) {
            this.setState({
                usernameStatus: response.data.status,
            });
        }
    }, 1000);

    handleUsernameChange = async (field, value) => {
        this.setState({
            username: value,
        });

        await this.validateUsername(value);
    };

    render() {
        const {usernameStatus, username} = this.state;

        return (
            <Card className="OnboardingSetUsernameStep">
                <div>
                    <span>One last thing is needed in order to start using your dashboard.</span>
                    <span>Let's setup a username</span>
                </div>
                    <Input field="username" onChange={this.handleUsernameChange} value={username} label="Username" icon="user"/>
                    {usernameStatus !== UsernameStatusMap.UNKNOWN && <UsernameStatusInfo status={usernameStatus}/>}
                <Button disabled={usernameStatus !== UsernameStatusMap.VALID}>
                    <span>Set username</span>
                </Button>
            </Card>
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
)(OnboardingSetUsernameStep);
