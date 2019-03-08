import React , {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import classNames from 'classnames';

import MixPanel from "../../Utils/MixPanel";
import {FeatureFlagTypes} from "../../Common/constants";
import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";
import * as projectActions from "../../Core/Project/Project.actions";

import {Container, Button, Icon} from "../../Elements";
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

    switchProject = (project) => {
        this.setState({
            currentProject: project.id,
        });
    };

    render () {
        const {project, projects, projectsLoaded} = this.props;
        const {currentProject, projectsDropdownOpen} = this.state;

        if (project.id !== currentProject) {
            return <Redirect to={`/project/${currentProject}`}/>
        }

        return (
            <Container>
                <div className="ProjectNavigation">
                    <div className="ProjectHeading">
                        <Button to={"/dashboard"} outline>
                            <Icon icon="corner-up-left"/>
                        </Button>
                        <div className="ProjectPicker">
                            <div className="CurrentProject" onClick={this.toggleProjectsDropdown}>
                                <div className="ProjectName">{project.name}</div>
                                <div className="DropdownIcon">
                                    <Icon icon="chevron-down"/>
                                </div>
                            </div>
                            {projectsDropdownOpen && <div className="ProjectsDropdown">
                                {!projectsLoaded && <div className="LoaderWrapper">
                                    <SimpleLoader/>
                                </div>}
                                {projectsLoaded && projects.map(project => <div key={project.id} className={classNames(
                                    "ProjectDropdownItem",
                                    {"Active": currentProject === project.id}
                                )} onClick={() => this.switchProject(project)}>
                                    <div className="ProjectName">{project.name}</div>
                                    <div className="ProjectSlug">{project.slug}</div>
                                </div>)}
                            </div>}
                        </div>
                    </div>
                    <div className="NavigationItems">
                        <NavLink className="NavigationItem" exact to={`/project/${project.id}/events`} onClick={() => this.trackNavigationItem('events')}>
                            <span>Errors</span>
                        </NavLink>
                        <NavLink className="NavigationItem" exact to={`/project/${project.id}/contracts`} onClick={() => this.trackNavigationItem('contracts')}>
                            <span>Contracts</span>
                        </NavLink>
                        <FeatureFlag flag={FeatureFlagTypes.ANALYTICS}>
                            <NavLink className="NavigationItem" exact to={`/project/${project.id}/analytics`} onClick={() => this.trackNavigationItem('analytics')}>
                                <span>Analytics</span>
                            </NavLink>
                        </FeatureFlag>
                        <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                            <NavLink className="NavigationItem" exact to={`/project/${project.id}/releases`} onClick={() => this.trackNavigationItem('deployment')}>
                                <span>Deployment</span>
                            </NavLink>
                        </FeatureFlag>
                        <FeatureFlag flag={FeatureFlagTypes.ALERTS}>
                            <NavLink className="NavigationItem" exact to={`/project/${project.id}/alerts`} onClick={() => this.trackNavigationItem('alerts')}>
                                <span>Alerts</span>
                            </NavLink>
                        </FeatureFlag>
                        <NavLink className="NavigationItem" exact to={`/project/${project.id}/settings`} onClick={() => this.trackNavigationItem('settings')}>
                            <span>Settings</span>
                        </NavLink>
                    </div>
                </div>
            </Container>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectNavigation);
