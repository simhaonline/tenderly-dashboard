import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {Collaborator} from "../../Core/models";

import {ValidateEmail} from "../../Utils/FormValidators";

import {
    CollaboratorPermissionGroupLabelMap,
    CollaboratorPermissionGroupTypes,
    CollaboratorPermissionTypeDescriptionMap, CollaboratorPermissionTypeGroupMap,
    CollaboratorPermissionTypeIconMap,
    CollaboratorPermissionTypes
} from "../../Common/constants";

import {Form, Button, PanelDivider, Toggle, Input, Icon} from "../../Elements";

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
        });
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

    /**
     * @param {boolean} newValue
     */
    handleAllPermissionsToggle = (newValue) => {
        const {permissions} = this.state;

        this.setState({
            permissions: Object.keys(permissions).reduce((data, permission) => {
                data[permission] = newValue;

                return data;
            }, {}),
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
        const {submitLabel, readOnlyEmail, onCancel} = this.props;
        const {email, permissions, inProgress} = this.state;

        const areAllPermissionActive = Object.keys(permissions).every(permission => permissions[permission]);

        const groupedPermissions = _.groupBy(Object.keys(CollaboratorPermissionTypes), permissionType => {
            if (!CollaboratorPermissionTypeGroupMap[permissionType]) {
                return CollaboratorPermissionGroupTypes.OTHER;
            }

            return CollaboratorPermissionTypeGroupMap[permissionType];
        });

        return (
            <div className="CollaboratorForm">
                <Form onSubmit={this.handleFormSubmit}>
                    <div className="CollaboratorForm__EmailWrapper">
                        <Input readOnly={readOnlyEmail} icon="mail" label="E-mail" value={email} field="collaborator-email" autoComplete="off" onChange={this.handleEmailChange}/>
                    </div>
                    <h3>Permissions</h3>
                    <PanelDivider/>
                    <div>
                        <div className="CollaboratorForm__Permission MarginBottom3">
                            <div className="CollaboratorForm__Permission__Label">
                                <span className="SemiBoldText">All Permissions</span>
                            </div>
                            <div>
                                <Toggle value={areAllPermissionActive} onChange={() => this.handleAllPermissionsToggle(!areAllPermissionActive)}/>
                            </div>
                        </div>
                        <div className="CollaboratorForm__PermissionGroups">
                            {Object.keys(groupedPermissions).map((permissionGroup) => <div key={permissionGroup} className="CollaboratorForm__PermissionGroup">
                                <h3 className="CollaboratorForm__PermissionGroup__Heading">{CollaboratorPermissionGroupLabelMap[permissionGroup]}</h3>
                                {groupedPermissions[permissionGroup].map(permission => <div key={permission} className="CollaboratorForm__Permission">
                                    <div className="CollaboratorForm__Permission__Label">
                                        <Icon icon={CollaboratorPermissionTypeIconMap[permission]} className="MarginRight2 MutedText"/>
                                        <span>{CollaboratorPermissionTypeDescriptionMap[permission]}</span>
                                    </div>
                                    <div>
                                        <Toggle value={permissions[permission]} onChange={() => this.handlePermissionToggle(permission)}/>
                                    </div>
                                </div>)}
                            </div>)}
                        </div>
                    </div>
                    <div className="MarginTop4">
                        <Button type="submit" disabled={!this.isFormValid() || inProgress}>
                            <span>{submitLabel}</span>
                        </Button>
                        {!!onCancel && <Button outline onClick={onCancel}>
                            <span>Cancel</span>
                        </Button>}
                    </div>
                </Form>
            </div>
        );
    }
}

CollaboratorForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    readOnlyEmail: PropTypes.bool,
    submitLabel: PropTypes.string,
    collaborator: PropTypes.instanceOf(Collaborator),
};

CollaboratorForm.defaultProps = {
    submitLabel: "Save",
    readOnlyEmail: false,
};

export default CollaboratorForm;
