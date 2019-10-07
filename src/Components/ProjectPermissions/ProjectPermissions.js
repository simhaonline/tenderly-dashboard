import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {
    CollaboratorPermissionTypeDescriptionMap,
    CollaboratorPermissionTypeIconMap,
    ProjectTypes
} from "../../Common/constants";

import {Project} from "../../Core/models";

import {Icon, Panel, PanelContent, PanelHeader} from "../../Elements";

import './ProjectPermissions.scss';

class ProjectPermissions extends PureComponent {
    render() {
        const {project} = this.props;

        if (project.type !== ProjectTypes.SHARED || !project.permissions) {
            return null;
        }

        return (
            <Panel className="ProjectPermissions">
                <PanelHeader>
                    <h3>Your Permissions</h3>
                </PanelHeader>
                <PanelContent>
                    {Object.keys(project.permissions).map(permission => <div key={permission} className="DisplayFlex AlignItemsCenter MarginBottom2">
                        <div className="ProjectPermissions__PermissionDescription">
                            <Icon icon={CollaboratorPermissionTypeIconMap[permission]} className="MutedText MarginRight1"/>
                            {CollaboratorPermissionTypeDescriptionMap[permission]}
                        </div>
                        <div>
                            {project.permissions[permission] && <span className="SuccessText SemiBoldText">Enabled</span>}
                            {!project.permissions[permission] && <span className="DangerText SemiBoldText">Disabled</span>}
                        </div>
                    </div>)}
                </PanelContent>
            </Panel>
        );
    }
}

ProjectPermissions.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired,
};

export default ProjectPermissions;
