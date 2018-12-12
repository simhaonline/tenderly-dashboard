import React, {Component} from 'react';

import MixPanel from "../../Utils/MixPanel";

import {Form, Input, Button} from "../../Elements";
import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import './CreateProjectForm.css';

class CreateProjectForm extends Component {
    constructor(props) {
        super(props);

        initializeForm(this, {
            projectName: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    generateProjectUrl = (projectName) => {
        const projectSlug = projectName.toLowerCase().replace(/[\W_]+/g, "-");

        return projectSlug;
    };

    handleFormSubmit = () => {
        const {onSubmit} = this.props;
        const {formData} = this.state;

        MixPanel.track('Create Project - Submit Form');

        onSubmit(formData);
    };

    render() {
        const {formData: {projectName}} = this.state;

        return (
            <Form onSubmit={this.handleFormSubmit} className="CreateProjectForm">
                <Input value={projectName} label="Project name" icon="project" field={"projectName"} onChange={this.handleFormUpdate} autoComplete="off" autoFocus/>
                <div className="SlugPreviewWrapper">
                    <div className="UrlLabel">Project URL Preview</div>
                    <div className="UrlPreview">https://tenderly.app/project/<span className="ProjectSlug">{this.generateProjectUrl(projectName)}</span></div>
                    <div className="UrlNote">* Slugs can not be changed later</div>
                </div>
                <div className="SubmitButtonWrapper">
                    <Button type="submit" disabled={!projectName}>
                        <span>Create Project</span>
                    </Button>
                </div>
            </Form>
        );
    }
}

CreateProjectForm.defaultProps = {
    onSubmit: () => {},
};

export default CreateProjectForm;
