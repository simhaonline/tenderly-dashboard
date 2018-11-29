import _ from 'lodash';

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

        /** @type Date */
        this.createdAt = data.created_at;
    }

    /**
     * @param {Project} project
     * @return {Project}
     */
    update(project) {
        const updateProperties = _.pick(project, ['lastPushAt', 'isSetup']);

        Object.assign(this, updateProperties);

        return this;
    }
}

export default Project;
