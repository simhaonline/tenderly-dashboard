import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as authActions from "../../Core/Auth/Auth.actions";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {Form, Input, Button} from "../../Elements";

import './UserInformationForm.css';

class UserInformationForm extends Component {
    constructor(props) {
        super(props);

        const {user} = props;

        this.state = {
            email: user.email,
            changingUsername: false,
            updating: false,
        };

        initializeForm(this, {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleFormSubmit = async () => {
        const {formData: {firstName, lastName}} = this.state;
        const {actions} = this.props;

        this.setState({
            updating: true,
        });

        await actions.updateUser({
            firstName,
            lastName,
        });

        this.setState({
            updating: false,
        });
        // @TODO Add toast noficiation
    };

    render() {
        const {email, changingUsername, updating, formData: {firstName, lastName, username}} = this.state;

        return (
            <div className="UserInformationForm">
                <Form onSubmit={this.handleFormSubmit}>
                    <div className="FormRow">
                        <div className="FormColumn">
                            <Input value={firstName} disabled={updating} field="firstName" label="First name" onChange={this.handleFormUpdate}/>
                        </div>
                        <div className="FormColumn">
                            <Input value={lastName} disabled={updating} field="lastName" label="Last name" onChange={this.handleFormUpdate}/>
                        </div>
                    </div>
                    <div className="FormRow">
                        <div className="FormColumn">
                            <Input value={email} field="email" readOnly label="E-mail" icon="mail"/>
                        </div>
                    </div>
                    <div className="FormRow">
                        <div className="FormColumn">
                            <Input value={username} field="username" label="Username" icon="user" readOnly={!changingUsername}/>
                        </div>
                    </div>
                    <Button type="submit" outline size="small" disabled={updating}>
                        {!updating && <span>Update Profile</span>}
                        {updating && <span>Updating...</span>}
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserInformationForm);
