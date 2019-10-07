import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {ProjectTypes} from "../../Common/constants";

import {Project} from "../../Core/models";

import './ProjectPermissions.scss';

class ProjectPermissions extends PureComponent {
    render() {
        const {project} = this.props;

        if (project.type !== ProjectTypes.SHARED || !project.permissions) {
            return null;
        }

        return (
            <div className="ProjectPermissions">
                permissioooooons
            </div>
        );
    }
}

ProjectPermissions.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired,
};

export default ProjectPermissions;
