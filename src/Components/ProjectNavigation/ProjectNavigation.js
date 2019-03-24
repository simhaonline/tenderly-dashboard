import React , {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

import MixPanel from "../../Utils/MixPanel";
import {FeatureFlagTypes, ProjectTypes} from "../../Common/constants";
import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";
import * as projectActions from "../../Core/Project/Project.actions";

import {Container, Button, Icon, Alert} from "../../Elements";
import {SimpleLoader, FeatureFlag} from "..";

import './ProjectNavigation.css';

class ProjectNavigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProject: props.project.id,
            projectsDropdownOpen: false,
        };
    };
    trackNavigationItem = (navItem) => {
        MixPanel.track(`navigate_project_${navItem}`);
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

    render () {
        const {project, projects, projectsLoaded} = this.props;
        const {currentProject, projectsDropdownOpen} = this.state;

        if (project.id !== currentProject) {
            return <Redirect to={`/project/${currentProject}`}/>
        }

        return (
            <div className="ProjectNavigationWrapper">
                <Container className="ProjectNavigation">
                    {project.type === ProjectTypes.DEMO && <Alert color="info">
                        <span>This is a demo project and all of the shown data is mocked.</span>
                    </Alert>}
                    <div className="ProjectHeading">
                        <Button to={"/dashboard"} outline color="secondary">
                            <Icon icon="corner-up-left"/>
                        </Button>
                        <OutsideClickHandler onOutsideClick={this.closeProjectsDropdown}>
                            <div className="ProjectPicker">
                                <div className="CurrentProject" onClick={this.toggleProjectsDropdown}>
                                    <div className="ProjectName">{project.name}</div>
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
                    </div>
                    <div className="NavigationItems">
                        <NavLink className="NavigationItem" exact to={`/project/${project.id}/events`} onClick={() => this.trackNavigationItem('events')}>
                            <span>Errors</span>
                        </NavLink>
                        <NavLink className="NavigationItem" exact to={`/project/${project.id}/contracts`} onClick={() => this.trackNavigationItem('contracts')}>
                            <span>Contracts</span>
                        </NavLink>
                        <NavLink className="NavigationItem" exact to={`/project/${project.id}/analytics`} onClick={() => this.trackNavigationItem('analytics')}>
                            <span>Analytics</span>
                        </NavLink>
                        <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                            <NavLink className="NavigationItem" exact to={`/project/${project.id}/releases`} onClick={() => this.trackNavigationItem('deployment')}>
                                <span>Deployment</span>
                            </NavLink>
                        </FeatureFlag>

                        <NavLink className="NavigationItem" exact to={`/project/${project.id}/alerts`} onClick={() => this.trackNavigationItem('alerts')}>
                            <span>Alerts</span>
                        </NavLink>
                        <NavLink className="NavigationItem" exact to={`/project/${project.id}/settings`} onClick={() => this.trackNavigationItem('settings')}>
                            <span>Settings</span>
                        </NavLink>
                    </div>
                </Container>
            </div>
        );
    }
}

ProjectNavigation.propTypes = {
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectNavigation));
