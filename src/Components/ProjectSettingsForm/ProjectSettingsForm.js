import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import * as projectActions from "../../Core/Project/Project.actions";

import {Card, CardHeading, Input} from "../../Elements";

import ProgressiveButton from "../ProgressiveButton/ProgressiveButton";

import './ProjectSettingsForm.scss';
import {ProjectTypes} from "../../Common/constants";

class ProjectSettingsForm extends Component {
    constructor(props) {
        super(props);

        initializeForm(this, {
            projectName: props.project.name,
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleSettingsUpdate = async () => {
        const {project, actions} = this.props;
        const {formData: {projectName}} = this.state;

        await actions.updateProject(project.id, {
            name: projectName,
        });

        return true;
    };

    render() {
        const {project} = this.props;
        const {formData: {projectName}} = this.state;

        return (
            <Card className="ProjectSettingsForm">
                <CardHeading>
                    <h3>Overview</h3>
                </CardHeading>
                <div>
                    <Input disabled={project.type === ProjectTypes.DEMO} field="projectName" value={projectName} onChange={this.handleFormUpdate} icon="edit-3" label="Project name"/>
                </div>
                <div className="SlugPreview">https://dashboard.tenderly.dev/project/<span className="ProjectSlug">{project.slug}</span></div>
                <ProgressiveButton disabled={project.type === ProjectTypes.DEMO} label="Save" progressLabel="Saving" color="primary" onClick={this.handleSettingsUpdate}/>
            </Card>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
    }
};

export default connect(
    null,
    mapDispatchToProps,
)(ProjectSettingsForm);
