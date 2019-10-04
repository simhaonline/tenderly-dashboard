import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ValidateEmail} from "../../Utils/FormValidators";

import {CollaboratorPermissionTypeDescriptionMap, CollaboratorPermissionTypes} from "../../Common/constants";

import {Collaborator} from "../../Core/models";
import {Form, Button, PanelDivider, Toggle, Input} from "../../Elements";

import './CollaboratorForm.scss';

/** @type CollaboratorPermissions */
const DEFAULT_PERMISSIONS = Object.keys(CollaboratorPermissionTypes).reduce((data, permission) => {
    data[permission] = false;

    return data;
}, {});

class CollaboratorForm extends Component {
    constructor(props) {
        super(props);

        const {collaborator} = props;

        this.state = {
            email: collaborator ? collaborator.email : '',
            permissions: collaborator ? collaborator.permissions : DEFAULT_PERMISSIONS,
            inProgress: false,
        };
    }

    /**
     * @param {string} field
     * @param {string} value
     */
    handleEmailChange = (field, value) => {
        this.setState({
            email: value,
        })
    };

    /**
     * @param {CollaboratorPermissionTypes} permission
     */
    handlePermissionToggle = (permission) => {
        const {permissions} = this.state;

        this.setState({
            permissions: {
                ...permissions,
                [permission]: !permissions[permission]
            },
        });
    };

    handleFormSubmit = async () => {
        const {email, permissions} = this.state;
        const {onSubmit} = this.props;

        if (!this.isFormValid()) return;

        this.setState({
            inProgress: true,
        });

        await onSubmit(email, permissions);

        this.setState({
            inProgress: false,
        });
    };

    /**
     * @return {boolean}
     */
    isFormValid = () => {
        const {email} = this.state;

        return email.length > 0 && ValidateEmail(email);
    };

    render() {
        const {submitLabel, readOnlyEmail} = this.props;
        const {email, permissions, inProgress} = this.state;

        return (
            <div className="CollaboratorForm">
                <Form onSubmit={this.handleFormSubmit}>
                    <div className="CollaboratorForm__EmailWrapper">
                        <Input readOnly={readOnlyEmail} icon="mail" label="E-mail" value={email} field="email" onChange={this.handleEmailChange}/>
                    </div>
                    <h3>Permissions</h3>
                    <PanelDivider/>
                    <div>
                        {Object.keys(permissions).map(permission => <div key={permission} className="CollaboratorForm__Permission">
                            <div className="CollaboratorForm__Permission__Label">{CollaboratorPermissionTypeDescriptionMap[permission]}</div>
                            <div>
                                <Toggle value={permissions[permission]} onChange={() => this.handlePermissionToggle(permission)}/>
                            </div>
                        </div>)}
                    </div>
                    <div className="MarginTop4">
                        <Button type="submit" disabled={!this.isFormValid() || inProgress}>
                            <span>{submitLabel}</span>
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

CollaboratorForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    readOnlyEmail: PropTypes.bool,
    submitLabel: PropTypes.string,
    collaborator: PropTypes.instanceOf(Collaborator),
};

CollaboratorForm.defaultProps = {
    submitLabel: "Save",
    readOnlyEmail: false,
};

export default CollaboratorForm;
