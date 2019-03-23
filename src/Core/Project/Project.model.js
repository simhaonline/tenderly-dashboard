import _ from 'lodash';
import {ProjectTypes} from "../../Common/constants";

class Project {
    constructor(data) {
        /** @type string */
        this.id = data.slug;

        /** @type string */
        this.name = data.name;

        /** @type string */
        this.slug = data.slug;

        /** @type Date */
        this.lastPushAt = data.last_push_at;

        /** @type boolean */
        this.isSetup = !!data.last_push_at;

        /** @type boolean */
        this.setupViewed = !!data.last_push_at;

        /** @type Date */
        this.createdAt = data.created_at;

        /** @type string */
        this.type = data.type || ProjectTypes.PRIVATE;
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
}

export default Project;
