import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import classNames from 'classnames';

import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";

import {projectActions} from "../../Core/actions";
import {Project} from "../../Core/models";

import {Select} from "../../Elements";
import {ProjectSelectOption, ProjectSelectValue} from "../index";

import './ProjectSelect.scss';

class ProjectSelect extends Component {
    componentDidMount() {
        const {projectActions, areProjectsLoaded} = this.props;

        if (areProjectsLoaded) {
            projectActions.fetchProjects('me');
        }
    }

    render() {
        const {projects, className, areProjectsLoaded, projectActions, ...props} = this.props;

        return (
            <div className={classNames(
                "ProjectSelect",
                {
                    "ProjectSelect--Loading": !areProjectsLoaded,
                },
                className,
            )}>
                <Select className="ProjectSelect__Select" options={projects} getOptionValue={project => project.id} getOptionLabel={project => project.name} components={{
                    Option: ProjectSelectOption,
                    SingleValue: ProjectSelectValue,
                    IndicatorSeparator: () => null,
                }} {...props}/>
            </div>
        );
    }
}

Project.propTypes = {
    value: PropTypes.instanceOf(Project).isRequired,
    onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        projects: getDashboardProjects(state, false),
        areProjectsLoaded: state.project.projectsLoaded,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        projectActions: bindActionCreators(projectActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectSelect);
