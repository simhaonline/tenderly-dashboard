import React from 'react';
import {components} from "react-select";

import {Icon} from "../../Elements";

function ProjectSelectValue(props) {
    /** @type {Project} */
    const project = props.data;

    return <components.SingleValue {...props} className="ProjectSelectValue PaddingLeft1">
        <div className="DisplayFlex AlignItemsCenter">
            <Icon icon={project.getIcon()}/>
            <div className="MarginLeft2">
                <div>{project.name}</div>
                <div className="MutedText">{project.getDisplaySlug()}</div>
            </div>
        </div>
    </components.SingleValue>;
}

export default ProjectSelectValue;
