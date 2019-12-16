import React from 'react';
import {components} from "react-select";

import {Icon} from "../../Elements";

function ProjectSelectOption(props) {
    /** @type {Project} */
    const project = props.data;

    return <components.Option {...props} className="ProjectSelectOption">
        <div className="DisplayFlex AlignItemsCenter">
            <Icon icon={project.getIcon()}/>
            <div className="MarginLeft2">
                <div>{project.name}</div>
                <div className="MutedText">{project.getDisplaySlug()}</div>
            </div>
        </div>
    </components.Option>;
}

export default ProjectSelectOption;
