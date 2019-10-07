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
import ProjectCollaboratorsPage from "./ProjectCollaboratorsPage";
import ProjectAddCollaboratorPage from "./ProjectAddCollaboratorPage";
import ProjectCollaboratorPage from "./ProjectCollaboratorPage";

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
            const response = await actions.fetchProject(projectSlug, username);

            if (!response.success) {
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
            // @TODO Create empty for projects that do not exist or you do not have permission to.
            // Should check if the username is the same as yours if not then display that it ether does not exist
            // or user doesn't have permission.
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
                    <Route path="/:username/:slug/transactions" component={ProjectTransactionsPage}/>
                    <Route path="/:username/:slug/tx/:network/:txHash/:tab?" strict component={ProjectTransactionPage}/>
                    <Route path="/:username/:slug/analytics" component={ProjectAnalyticsPage}/>
                    <Route path="/:username/:slug/alerts/:tab" component={ProjectAlertsPage}/>
                    <Redirect from="/:username/:slug/alerts" to="/:username/:slug/alerts/rules"/>
                    <Route path="/:username/:slug/contracts" component={ProjectContractsPage}/>
                    <Route path="/:username/:slug/contract/:network/:contractId" component={ProjectContractPage}/>
                    <Route path="/:username/:slug/releases" component={ProjectReleasesPage}/>
                    <Route path="/:username/:slug/collaborators" exact component={ProjectCollaboratorsPage}/>
                    <Route path="/:username/:slug/collaborators/add" exact component={ProjectAddCollaboratorPage}/>
                    <Route path="/:username/:slug/collaborators/:collaboratorId" strict component={ProjectCollaboratorPage}/>
                    <Route path="/:username/:slug/settings" component={ProjectSettingsPage}/>
                    <Redirect to={`/:username/:slug/transactions`}/>
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
