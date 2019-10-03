import _ from 'lodash';
import {ProjectTypes} from "../../Common/constants";

class Project {
    /**
     * @param {Object} data
     * @param {User.username} [username]
     * @param {ProjectTypes} [projectType]
     */
    constructor(data, username, projectType) {
        /** @type string */
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
        this.owner = username;

        /** @type string */
        this.type = projectType || ProjectTypes.PRIVATE;
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
     * @param {User.username} username
     * @param {ProjectTypes} [projectType]
     *
     * @return {Project}
     */
    static buildFromResponse(response, username, projectType) {
        return new Project({
            id: Project.generateProjectId(response.slug, username),
            name: response.name,
            slug: response.slug,
            lastPushAt: response.last_push_at,
            isSetup: !!response.last_push_at,
            setupViewed: !!response.last_push_at,
            createdAt: response.created_at,
        }, username, projectType);
    }
}

export default Project;
