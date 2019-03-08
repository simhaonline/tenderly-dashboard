import React from 'react';

import {CircularLoader} from "..";

import './ProjectPageLoader.css';

const ProjectPageLoader = () => (
    <div className="ProjectPageLoader">
        <CircularLoader/>
        <div className="LoadingMessage">Fetching Project...</div>
    </div>
);

export default ProjectPageLoader;
