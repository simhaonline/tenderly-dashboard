import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {ProjectTypes} from "../../Common/constants";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import * as projectActions from "../../Core/Project/Project.actions";

import {Panel, PanelHeader, PanelContent, Input} from "../../Elements";
import {ProgressiveButton} from "../index";

import './ProjectSettingsForm.scss';

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

        await actions.updateProject(project, {
            name: projectName,
        });

        return true;
    };

    render() {
        const {project} = this.props;
        const {formData: {projectName}} = this.state;

        return (
            <Panel className="ProjectSettingsForm">
                <PanelHeader>
                    <h3>Overview</h3>
                </PanelHeader>
                <PanelContent>
                    <div>
                        <Input disabled={project.type === ProjectTypes.DEMO} readOnly={project.type === ProjectTypes.SHARED} field="projectName" value={projectName} onChange={this.handleFormUpdate} icon="edit-3" label="Project name"/>
                    </div>
                    <div className="SlugPreview">https://dashboard.tenderly.dev<span className="ProjectSlug">{project.getUrlBase()}</span></div>
                    {project.type !== ProjectTypes.SHARED && <ProgressiveButton disabled={project.type === ProjectTypes.DEMO} label="Save" progressLabel="Saving" color="primary" onClick={this.handleSettingsUpdate}/>}
                </PanelContent>
            </Panel>
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
