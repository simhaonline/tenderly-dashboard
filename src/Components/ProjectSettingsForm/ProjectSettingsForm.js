import React from 'react';

import {Card, CardHeading} from "../../Elements";

import './ProjectSettingsForm.css';

const ProjectSettingsForm = ({onSubmit, onChange, project}) => {
    return (
        <Card className="ProjectSettingsForm">
            <CardHeading>
                <h3>Overview</h3>
            </CardHeading>
            <div>{project.name}</div>
            <div>{project.slug}</div>
        </Card>
    );
};

export default ProjectSettingsForm;
