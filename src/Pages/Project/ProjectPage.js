import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";

import {getProject} from "../../Common/Selectors/ProjectSelectors";
import * as projectActions from "../../Core/Project/Project.actions";

import ProjectTransactionsPage from "./ProjectTransactionsPage";
import ProjectTransactionPage from "./ProjectTransactionPage";
import ProjectEventsPage from "./ProjectEventsPage";
import ProjectAnalyticsPage from "./ProjectAnalyticsPage";
import ProjectAlertsPage from "./ProjectAlertsPage";
import ProjectContractsPage from "./ProjectContractsPage";
import ProjectReleasesPage from "./ProjectReleasesPage";
import ProjectSettingsPage from "./ProjectSettingsPage";
import ProjectContractPage from "./ProjectContractPage";

import EventPage from "../Event/EventPage";
import {ProjectSidebar, ProjectPageLoader} from "../../Components";

class ProjectPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nonExistingProject: false,
        };
    }

    async componentDidMount() {
        const {project, actions, projectId} = this.props;

        if (!project) {
            const fetchedProject = await actions.fetchProject(projectId);

            if (!fetchedProject) {
                this.setState({
                    nonExistingProject: true,
                })
            }
        }
    }

    render(){
        const {project} = this.props;
        const {nonExistingProject} = this.state;

        if (nonExistingProject) {
            return <Redirect to="/dashboard"/>
        }

        if (!project) {
            return <ProjectPageLoader text="Fetching Project..."/>;
        }

        return (
            <Fragment>
                <ProjectSidebar project={project}/>
                <Switch>
                    <Route path="/project/:id/transactions" component={ProjectTransactionsPage}/>
                    <Route path="/project/:id/tx/:network/:txHash" component={ProjectTransactionPage}/>
                    <Route path="/project/:id/errors" component={ProjectEventsPage}/>
                    <Route path="/project/:id/error/:network/:eventId" component={EventPage}/>
                    <Route path="/project/:id/analytics" component={ProjectAnalyticsPage}/>
                    <Route path="/project/:id/alerts" component={ProjectAlertsPage}/>
                    <Route path="/project/:id/contracts" component={ProjectContractsPage}/>
                    <Route path="/project/:id/contract/:network/:contractId" component={ProjectContractPage}/>
                    <Route path="/project/:id/releases" component={ProjectReleasesPage}/>
                    <Route path="/project/:id/settings" component={ProjectSettingsPage}/>
                    <Redirect to={`/project/${project.id}/transactions`}/>
                </Switch>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}} = ownProps;

    return {
        projectId: id,
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
