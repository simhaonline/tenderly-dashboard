import React from 'react';

import {DotLoader} from "..";

import './ProjectContentLoader.css';

const ProjectContentLoader = ({text}) => (
    <div className="ProjectContentLoader">
        <DotLoader/>
        <div className="LoaderText">{text}</div>
    </div>
);

export default ProjectContentLoader;
