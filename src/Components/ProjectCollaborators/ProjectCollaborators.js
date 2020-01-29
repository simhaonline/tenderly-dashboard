import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    CollaboratorPermissionTypeDescriptionMap,
    CollaboratorPermissionTypeIconMap,
    ProjectTypes
} from "../../Common/constants";

import {Collaborator, Project} from "../../Core/models";

import {Panel, PanelHeader, PanelContent, List, Icon, ListItem, Tooltip, Button} from "../../Elements";
import {EmptyState} from "../index";

import './ProjectCollaborators.scss';

class ProjectCollaborators extends PureComponent {
    render() {
        const {project, collaborators, readOnly} = this.props;

        return (
            <div>
                <Panel>
                    <PanelHeader>
                        <h3>Collaborators in {project.name}</h3>
                    </PanelHeader>
                    <PanelContent>
                        {collaborators.length === 0 && <EmptyState icon="users" title="No Collaborators" description="Add collaborators to this project to share with your team mates." renderActions={() => <div>
                            {project.type === ProjectTypes.PRIVATE && <Button color="secondary" to={`${project.getUrlBase()}/collaborators/add`}>
                                <span>Add Collaborator</span>
                            </Button>}
                        </div>}/>}
                        {collaborators.length > 0 && <List clickable={!readOnly}>
                            {collaborators.map(collaborator => <ListItem key={collaborator.id} to={!readOnly ? `/${project.owner}/${project.slug}/collaborators/${collaborator.id}` : null} className="ProjectCollaborators__Collaborator">
                                <div className="ProjectCollaborators__Collaborator__NameColumn">
                                    <div className="SemiBoldText">{collaborator.getDisplayableIdentifier()}</div>
                                    <div className="MutedText">{collaborator.email}</div>
                                </div>
                                <div className="ProjectCollaborators__Collaborator__AddedColumn">
                                    <div className="MutedText">Added</div>
                                    <span className="SemiBoldText">{collaborator.addedAt.format('DD/MM/YYYY')}</span>
                                </div>
                                <div className="ProjectCollaborators__Collaborator__PermissionsColumn">
                                    {Object.keys(collaborator.permissions).map(permission => <Fragment key={permission}>
                                        <div id={`${permission}_${collaborator.id}`} className={classNames(
                                            "ProjectCollaborators__Collaborator__PermissionsIcon",
                                            {
                                                "ProjectCollaborators__Collaborator__PermissionsIcon--Active": collaborator.permissions[permission],
                                            },
                                        )}>
                                            <Icon icon={CollaboratorPermissionTypeIconMap[permission]}/>
                                        </div>
                                        <Tooltip hideDelay={0} placement="top" id={`${permission}_${collaborator.id}`}>
                                            The user {collaborator.permissions[permission] ? 'can' : 'can not'} {CollaboratorPermissionTypeDescriptionMap[permission].toLowerCase()}.
                                        </Tooltip>
                                    </Fragment>)}
                                </div>
                            </ListItem>)}
                        </List>}
                    </PanelContent>
                </Panel>
            </div>
        );
    }
}

ProjectCollaborators.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired,
    collaborators: PropTypes.arrayOf(PropTypes.instanceOf(Collaborator)).isRequired,
    readOnly: PropTypes.bool,
};

ProjectCollaborators.defaultProps = {
    readOnly: false,
};

export default ProjectCollaborators;
