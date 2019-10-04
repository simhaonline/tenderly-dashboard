/**
 * @param {Object} state
 * @param {Project} project
 *
 * @returns {Collaborator[]}
 */
export function getCollaboratorsForProject(state, project) {
    if (!state.collaboration.projectCollaborators[project.id]) {
        return [];
    }

    return state.collaboration.projectCollaborators[project.id].map(collaboratorId => {
        return state.collaboration.collaborators[collaboratorId];
    });
}


/**
 * @param {Object} state
 * @param {Project} project
 *
 * @returns {boolean}
 */
export function areCollaboratorsLoadedForProject(state, project) {
    return state.collaboration.projectCollaboratorsLoaded[project.id];
}
