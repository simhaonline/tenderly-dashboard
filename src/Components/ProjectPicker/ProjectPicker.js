import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import classNames from 'classnames';
import OutsideClickHandler from "react-outside-click-handler";

import {Project} from "../../Core/models";

import * as projectActions from "../../Core/Project/Project.actions";

import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";

import {Icon} from "../../Elements";
import {SimpleLoader} from "../index";

import './ProjectPicker.scss';
import {ProjectTypes} from "../../Common/constants";

class ProjectPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectsDropdownOpen: false,
        };
    };

    toggleProjectsDropdown = () => {
        const {projectsDropdownOpen} = this.state;
        const {projectsLoaded, username, actions} = this.props;

        this.setState({
            projectsDropdownOpen: !projectsDropdownOpen,
        });

        if (!projectsLoaded) {
            actions.fetchProjects(username);
        }
    };

    closeProjectsDropdown = () => {
        this.setState({
            projectsDropdownOpen: false,
        });
    };

    render() {
        const {project, projects, projectsLoaded} = this.props;
        const {projectsDropdownOpen} = this.state;

        const sharedProjects = projects.filter(p => p.type === ProjectTypes.SHARED);
        const privateProjects = projects.filter(p => p.type !== ProjectTypes.SHARED);

        return (
            <OutsideClickHandler onOutsideClick={this.closeProjectsDropdown}>
                <div className="ProjectPicker HideMobile">
                    {!!project && <div className="CurrentProject" onClick={this.toggleProjectsDropdown}>
                        <div className="ProjectInfo">
                            <Icon icon={project.getIcon()} className="ProjectIcon"/>
                            <div className="ProjectInfo__General">
                                <div className="ProjectName">{project.name}</div>
                                <div className="ProjectSlug">{project.getDisplaySlug()}</div>
                            </div>
                        </div>
                        <Icon icon="chevron-down" className="DropdownIcon"/>
                    </div>}
                    {!project && <div className="CurrentProject" onClick={this.toggleProjectsDropdown}>
                        <div className="ProjectInfo">
                            <Icon icon="project" className="ProjectIcon ProjectIcon--NoColor"/>
                            <div className="ProjectInfo__General">
                                <div className="ProjectName">Select Project</div>
                            </div>
                        </div>
                        <Icon icon="chevron-down" className="DropdownIcon"/>
                    </div>}
                    {projectsDropdownOpen && <div className="ProjectsDropdown">
                        {!projectsLoaded && <div className="LoaderWrapper">
                            <SimpleLoader/>
                        </div>}
                        {projectsLoaded && <Fragment>
                            {sharedProjects.length > 0 && <Fragment>
                                <h4 className="ProjectDropdownList__Heading">Shared Projects</h4>
                                {sharedProjects.map(projectItem => <Link key={projectItem.id} className={classNames(
                                    "ProjectDropdownItem",
                                    {"ProjectDropdownItem--Active": project && projectItem.id === project.id},
                                )} to={projectItem.getUrlBase()} onClick={this.closeProjectsDropdown}>
                                    <Icon icon={projectItem.getIcon()} className="ProjectIcon"/>
                                    <div className="ProjectDropdownItem__General">
                                        <div className="ProjectName">{projectItem.name}</div>
                                        <div className="ProjectSlug">{projectItem.getDisplaySlug()}</div>
                                    </div>
                                </Link>)}
                            </Fragment>}
                            {privateProjects.length > 0 && <Fragment>
                                <h4 className="ProjectDropdownList__Heading">Personal Projects</h4>
                                {privateProjects.map(projectItem => <Link key={projectItem.id} className={classNames(
                                    "ProjectDropdownItem",
                                    {"ProjectDropdownItem--Active": project && projectItem.id === project.id},
                                )} to={projectItem.getUrlBase()} onClick={this.closeProjectsDropdown}>
                                    <Icon icon={projectItem.getIcon()} className="ProjectIcon"/>
                                    <div className="ProjectDropdownItem__General">
                                        <div className="ProjectName">{projectItem.name}</div>
                                        <div className="ProjectSlug">{projectItem.getDisplaySlug()}</div>
                                    </div>
                                </Link>)}
                            </Fragment>}
                            <div className="ProjectDropdownDivider"/>
                            <Link className="ProjectDropdownItem" to="/project/create" onClick={this.closeProjectsDropdown}>
                                <Icon icon="plus" className="ProjectIcon"/>
                                <div className="ProjectDropdownItem__General">
                                    <div className="ProjectName">Create Project</div>
                                    <div className="ProjectSlug">Monitor your contracts and wallets</div>
                                </div>
                            </Link>
                        </Fragment>}
                    </div>}
                </div>
            </OutsideClickHandler>
        );
    }
}

ProjectPicker.propTypes = {
    project: PropTypes.instanceOf(Project),
};

const mapStateToProps = (state) => {
    return {
        username: state.auth.user.username,
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
