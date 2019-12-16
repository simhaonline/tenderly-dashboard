import React from 'react';
import classNames from "classnames";
import {components} from "react-select";

import {Icon} from "../../Elements";

function ProjectSelectOption(props) {
    /** @type {Project} */
    const project = props.data;

    return <components.Option {...props} className="ProjectSelectOption">
        {project.slug}
    </components.Option>;
}

export default ProjectSelectOption;
