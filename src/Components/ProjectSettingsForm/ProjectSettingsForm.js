import React from 'react';

import {Card} from "../../Elements";

import './ProjectSettingsForm.css';

const ProjectSettingsForm = ({onSubmit, onChange, project}) => {
    return (
        <Card className="ProjectSettingsForm">
            <div>{project.name}</div>
            <div>{project.slug}</div>
        </Card>
    );
};

export default ProjectSettingsForm;
