import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";

import * as projectActions from "../../Core/Project/Project.actions";

import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";

import {Icon} from "../../Elements";
import {SimpleLoader} from "../index";

import './ProjectPicker.scss';

class ProjectPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProject: props.project.id,
            projectsDropdownOpen: false,
        };
    };

    toggleProjectsDropdown = () => {
        const {projectsDropdownOpen} = this.state;
        const {projectsLoaded, actions} = this.props;

        this.setState({
            projectsDropdownOpen: !projectsDropdownOpen,
        });

        if (!projectsLoaded) {
            actions.fetchProjects();
        }
    };

    closeProjectsDropdown = () => {
        this.setState({
            projectsDropdownOpen: false,
        });
    };

    switchProject = (project) => {
        this.setState({
            currentProject: project.id,
            projectsDropdownOpen: false,
        });
    };

    render() {
        const {project, projects, projectsLoaded} = this.props;
        const {currentProject, projectsDropdownOpen} = this.state;

        if (project.id !== currentProject) {
            return <Redirect to={`/project/${currentProject}`}/>
        }

        return (
            <OutsideClickHandler onOutsideClick={this.closeProjectsDropdown}>
                <div className="ProjectPicker">
                    <div className="CurrentProject" onClick={this.toggleProjectsDropdown}>
                        <div className="ProjectInfo">
                            <Icon icon="project" className="ProjectIcon"/>
                            <div>
                                <div className="ProjectName">{project.name}</div>
                                <div className="ProjectSlug">{project.slug}</div>
                            </div>
                        </div>
                        <Icon icon="chevron-down" className="DropdownIcon"/>
                    </div>
                    {projectsDropdownOpen && <div className="ProjectsDropdown">
                        {!projectsLoaded && <div className="LoaderWrapper">
                            <SimpleLoader/>
                        </div>}
                        {projectsLoaded && projects.map(project => <div key={project.id} className={classNames(
                            "ProjectDropdownItem",
                            {"Active": currentProject === project.id}
                        )} onClick={() => this.switchProject(project)}>
                            <Icon icon="project" className="ProjectIcon"/>
                            <div>
                                <div className="ProjectName">{project.name}</div>
                                <div className="ProjectSlug">{project.slug}</div>
                            </div>
                        </div>)}
                    </div>}
                </div>
            </OutsideClickHandler>
        );
    }
}

ProjectPicker.propTypes = {
    project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        projectsLoaded: state.project.projectsLoaded,
        projects: getDashboardProjects(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectPicker);
