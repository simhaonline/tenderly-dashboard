import _ from 'lodash';

import {ProjectTypes} from "../../Common/constants";

import Collaborator from "../Collaboration/Collaborator.model";

class Project {
    /**
     * @param {Object} data
     * @param {User.username} [owner]
     * @param {ProjectTypes} [projectType]
     */
    constructor(data, owner, projectType) {
        /**
         * Unique ID for project that is generated using the static Project.generateProjectId() method.
         * @type string
         * @example
         * coolusername:my-project-slug
         */
        this.id = data.id;

        /** @type string */
        this.name = data.name;

        /** @type string */
        this.slug = data.slug;

        /** @type Date */
        this.lastPushAt = data.lastPushAt;

        /** @type boolean */
        this.isSetup = data.isSetup;

        /** @type boolean */
        this.setupViewed = data.setupViewed;

        /** @type Date */
        this.createdAt = data.createdAt;

        /** @type {User.username} */
        this.owner = owner;

        /** @type string */
        this.type = projectType || ProjectTypes.PRIVATE;

        /**
         * This property exists only if the project is of ProjectTypes.SHARED type.
         *
         * @type {CollaboratorPermissions}
         */
        this.permissions = data.permissions;
    }

    /**
     * @returns {Project}
     */
    viewSetup() {
        this.setupViewed = true;

        return this;
    }

    /**
     * @param {Project} project
     * @return {Project}
     */
    update(project) {
        const updateProperties = _.pick(project, ['name', 'lastPushAt', 'isSetup']);

        const newProject = new Project({});

        Object.assign(newProject, this, updateProperties);

        return newProject;
    }

    /**
     * @return {string}
     */
    getDisplaySlug = () => {
        if (this.type === ProjectTypes.SHARED) {
            return `${this.owner}/${this.slug}`
        }

        return this.slug;
    };

    /**
     * @return {string}
     */
    getIcon = () => {
        if (this.type === ProjectTypes.SHARED) {
            return "organization";
        }

        if (this.type === ProjectTypes.DEMO) {
            return "package";
        }

        return "project";
    };

    /**
     * @param {string} slug
     * @param {string} username
     *
     * @return {Project.id} projectId
     */
    static generateProjectId(slug, username) {
        return `${username}:${slug}`;
    }

    /**
     * @param {Project.id} projectId
     * @return {{slug: string, username: string}}
     */
    static getSlugAndUsernameFromId(projectId) {
        const [username, slug] = projectId.split(':');

        return {
            slug,
            username,
        };
    }

    /**
     * @param {Object} response
     * @param {User} user
     * @param {ProjectTypes} [type]
     *
     * @return {Project}
     */
    static buildFromResponse(response, user, type) {
        let projectOwner = user.username;
        let projectType = type;
        let permissions;

        if (response.owner_id !== user.id) {
            projectOwner = response.owner.username;
            projectType = ProjectTypes.SHARED;
            permissions = response.permissions ? Collaborator.transformPermissionsToApp(response.permissions) : null;
        }

        return new Project({
            id: Project.generateProjectId(response.slug, projectOwner),
            name: response.name,
            slug: response.slug,
            lastPushAt: response.last_push_at,
            isSetup: !!response.last_push_at,
            setupViewed: !!response.last_push_at,
            createdAt: response.created_at,
            permissions,
        }, projectOwner, projectType);
    }
}

export default Project;
