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
 * @param {Collaborator.id} collaboratorId
 *
 * @returns {(Collaborator|null)}
 */
export function getCollaboratorForProject(state, project, collaboratorId) {
    const projectCollaborators = state.collaboration.projectCollaborators[project.id];
    if (!projectCollaborators || !projectCollaborators.includes(collaboratorId)) {
        return null;
    }

    return state.collaboration.collaborators[collaboratorId];
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
