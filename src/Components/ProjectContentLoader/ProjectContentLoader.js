import React from 'react';

import {CircularLoader} from "..";

import './ProjectContentLoader.scss';

const ProjectContentLoader = ({text}) => (
    <div className="ProjectContentLoader">
        <CircularLoader/>
        <div className="LoaderText">{text}</div>
    </div>
);

export default ProjectContentLoader;
