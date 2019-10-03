import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {Helmet} from "react-helmet";

import {Project} from "../../Core/models";

import {getProject} from "../../Common/Selectors/ProjectSelectors";
import * as projectActions from "../../Core/Project/Project.actions";

import ProjectTransactionsPage from "./ProjectTransactionsPage";
import ProjectTransactionPage from "./ProjectTransactionPage";
import ProjectAnalyticsPage from "./ProjectAnalyticsPage";
import ProjectAlertsPage from "./ProjectAlertsPage";
import ProjectContractsPage from "./ProjectContractsPage";
import ProjectReleasesPage from "./ProjectReleasesPage";
import ProjectSettingsPage from "./ProjectSettingsPage";
import ProjectContractPage from "./ProjectContractPage";

import {ProjectSidebar, ProjectPageLoader} from "../../Components";

class ProjectPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nonExistingProject: false,
        };
    }

    async componentDidMount() {
        const {project, actions, projectSlug, username} = this.props;

        if (!project) {
            const fetchedProject = await actions.fetchProject(projectSlug, username);

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
                <Helmet>
                    <title>{project.name} | Tenderly</title>
                </Helmet>
                <ProjectSidebar project={project}/>
                <Switch>
                    <Route path="/:username/:id/transactions" component={ProjectTransactionsPage}/>
                    <Route path="/:username/:id/tx/:network/:txHash/:tab?" strict component={ProjectTransactionPage}/>
                    <Route path="/:username/:id/analytics" component={ProjectAnalyticsPage}/>
                    <Route path="/:username/:id/alerts/:tab" component={ProjectAlertsPage}/>
                    <Redirect from="/:username/:id/alerts" to="/:username/:id/alerts/rules"/>
                    <Route path="/:username/:id/contracts" component={ProjectContractsPage}/>
                    <Route path="/:username/:id/contract/:network/:contractId" component={ProjectContractPage}/>
                    <Route path="/:username/:id/releases" component={ProjectReleasesPage}/>
                    <Route path="/:username/:id/settings" component={ProjectSettingsPage}/>
                    <Redirect to={`/:username/${project.slug}/transactions`}/>
                </Switch>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug}}} = ownProps;

    return {
        username,
        projectSlug: slug,
        project: getProject(state, Project.generateProjectId(slug, username)),
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
