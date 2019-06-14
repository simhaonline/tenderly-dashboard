import React from 'react';

import {CircularLoader} from "..";

import './ProjectPageLoader.scss';

const ProjectPageLoader = ({text}) => (
    <div className="ProjectPageLoader">
        <CircularLoader/>
        <div className="LoadingMessage">{text}</div>
    </div>
);

ProjectPageLoader.defaultProps = {
    text: 'Fetching Data...'
};

export default ProjectPageLoader;
