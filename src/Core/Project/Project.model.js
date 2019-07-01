import _ from 'lodash';
import {ProjectTypes} from "../../Common/constants";

class Project {
    /**
     * @param {Object} data
     * @param {ProjectTypes} [projectType]
     */
    constructor(data, projectType) {
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
     * @param {Object} response
     * @return {Project}
     */
    static buildFromResponse(response) {
        return new Project({
            id: response.slug,
            name: response.name,
            slug: response.slug,
            lastPushAt: response.last_push_at,
            isSetup: !!response.last_push_at,
            setupViewed: !!response.last_push_at,
            createdAt: response.created_at,
        });
    }
}

export default Project;
