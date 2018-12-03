import React, {Component} from 'react';

import {Form, Input, Button} from "../../Elements";
import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

class CreateProjectForm extends Component {
    constructor(props) {
        super(props);

        initializeForm(this, {
            projectName: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    generateProjectUrl = () => {

    };

    handleFormSubmit = () => {
        const {onSubmit} = this.props;
        const {formData} = this.state;

        onSubmit(formData);
    };

    render() {
        const {formData: {projectName}} = this.state;

        return (
            <Form onSubmit={this.handleFormSubmit}>
                <Input value={projectName} label="Project name" icon="project" field={"projectName"} onChange={this.handleFormUpdate}/>
                <div></div>
                <Button type="submit">
                    <span>Create</span>
                </Button>
            </Form>
        );
    }
}

CreateProjectForm.defaultProps = {
    onSubmit: () => {},
};

export default CreateProjectForm;
