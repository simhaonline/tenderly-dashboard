import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";

import {getProject} from "../../Common/Selectors/ProjectSelectors";
import * as projectActions from "../../Core/Project/Project.actions";

import ProjectEventsPage from "./ProjectEventsPage";
import ProjectUsagePage from "./ProjectUsagePage";
import ProjectAlertsPage from "./ProjectAlertsPage";
import ProjectContractsPage from "./ProjectContractsPage";
import ProjectReleasesPage from "./ProjectReleasesPage";
import ProjectSettingsPage from "./ProjectSettingsPage";

import {ProjectNavigation} from "../../Components";

import './ProjectPage.css';

class ProjectPage extends Component {
    render(){
        const {project} = this.props;

        if (!project) {
            return null;
        }

        return (
            <Fragment>
                <ProjectNavigation project={project}/>
                <Switch>
                    <Route path="/project/:id/events" component={ProjectEventsPage}/>
                    <Route path="/project/:id/usage" component={ProjectUsagePage}/>
                    <Route path="/project/:id/alerts" component={ProjectAlertsPage}/>
                    <Route path="/project/:id/contracts" component={ProjectContractsPage}/>
                    <Route path="/project/:id/releases" component={ProjectReleasesPage}/>
                    <Route path="/project/:id/settings" component={ProjectSettingsPage}/>
                    <Redirect to={`/project/${project.id}/events`}/>
                </Switch>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}} = ownProps;

    return {
        project: getProject(state, id),
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
)(ProjectPage);
