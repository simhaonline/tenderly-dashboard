import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Collaborator} from "../../Core/models";
import {Form, Button, Icon, Tooltip, PanelDivider, Toggle, Input} from "../../Elements";

import './CollaboratorForm.scss';

const DEFAULT_PERMISSIONS = {};

class CollaboratorForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            permissions: DEFAULT_PERMISSIONS,
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
     * @param {string} permission
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

    handleFormSubmit = () => {
        const {email, permissions} = this.state;
        const {onSubmit} = this.props;

        if (!this.isFormValid()) return;

        onSubmit(email, permissions);
    };

    /**
     * @return {boolean}
     */
    isFormValid = () => {
        const {email} = this.state;

        return false;
    };

    render() {
        const {submitLabel} = this.props;
        const {email, permissions} = this.state;

        return (
            <div className="CollaboratorForm">
                <Form onSubmit={this.handleFormSubmit}>
                    <Input icon="mail" label="E-mail" value={email} field="email" onChange={this.handleEmailChange}/>
                    <h3>Permissions</h3>
                    <PanelDivider/>
                    <div>
                        {Object.keys(permissions).map(permission => <div key={permission}>
                            <div>{permission}</div>
                            <div>
                                <Toggle value={permissions[permission]} onChange={() => this.handlePermissionToggle(permission)}/>
                            </div>
                        </div>)}
                    </div>
                    <div>
                        <Button type="submit" disabled={!this.isFormValid()}>
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
    submitLabel: PropTypes.string,
    collaborator: PropTypes.instanceOf(Collaborator),
};

CollaboratorForm.defaultProps = {
    submitLabel: "Save",
};

export default CollaboratorForm;
