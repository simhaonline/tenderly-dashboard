import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Sidebar} from '../../Elements';
import {ProjectNavigation, ProjectPicker} from '../index';

class ProjectSidebar extends Component {
    render() {
        const {project} = this.props;

        return (
            <Sidebar id="ProjectSidebar">
                <ProjectPicker project={project}/>
                <ProjectNavigation project={project}/>
            </Sidebar>
        );
    }
}

ProjectSidebar.propTypes = {
    project: PropTypes.object.isRequired,
};

export default ProjectSidebar;
