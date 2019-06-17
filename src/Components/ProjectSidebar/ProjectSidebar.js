import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Sidebar} from '../../Elements';
import {ProjectNavigation} from '../index';

class ProjectSidebar extends Component {
    render() {
        const {project} = this.props;

        return (
            <Sidebar>
                {/*<ProjectPicker/>*/}
                <ProjectNavigation project={project}/>
            </Sidebar>
        );
    }
}

ProjectSidebar.propTypes = {
    project: PropTypes.object.isRequired,
};

export default ProjectSidebar;
