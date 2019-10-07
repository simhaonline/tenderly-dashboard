import {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {CollaboratorPermissionTypes, ProjectTypes} from "../../Common/constants";

import {Project} from "../../Core/models";

class PermissionControl extends PureComponent {
    render() {
        const {project, children, requiredPermission} = this.props;

        if (project.type === ProjectTypes.SHARED && !project.permissions[requiredPermission]) {
            return null;
        }

        return children;
    }
}

PermissionControl.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired,
    requiredPermission: PropTypes.oneOf(Object.values(CollaboratorPermissionTypes)).isRequired,
};

export default PermissionControl;
