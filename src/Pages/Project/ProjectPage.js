import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {Helmet} from "react-helmet";

import {isTransactionOrContractUrl} from "../../Utils/UrlHelpers";

import {ProjectTypes} from "../../Common/constants";
import {areProjectTagsLoaded, getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {searchActions, projectActions} from "../../Core/actions";

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
import ProjectAddContractPage from "./ProjectAddContractPage";
import ProjectWalletsPage from "./ProjectWalletsPage";
import ProjectPlanPage from "./ProjectPlanPage";
import ProjectPrivateNetworksPage from "./ProjectPrivateNetworksPage";
import ProjectEventsPage from "./ProjectEventsPage";
import ProjectWalletPage from "./ProjectWalletPage";
import ProjectAddWalletPage from "./ProjectAddWalletPage";
import ProjectCreateGraphPage from "./ProjectCreateGraphPage";
import ProjectSecurityPage from "./ProjectSecurityPage";

import {AppSidebar, ProjectPageLoader} from "../../Components";

class ProjectPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nonExistingProject: false,
        };
    }

    async componentDidMount() {
        const {project, actions, projectSlug, tagsLoaded, username, searchActions} = this.props;

        searchActions.setProjectContext(projectSlug, username);

        if (!project) {
            const response = await actions.fetchProject(projectSlug, username);

            if (!response.success) {
                return this.setState({
                    nonExistingProject: true,
                })
            }

            await actions.fetchProjectTags(response.data);
        } else if (!tagsLoaded && project.type !== ProjectTypes.DEMO) {
            await actions.fetchProjectTags(project);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {tagsLoaded, project, actions, searchActions} = this.props;

        if (!!prevProps.project && prevProps.project.id !== project.id) {
            searchActions.setProjectContext(project.slug, project.owner);

            if (!tagsLoaded) {
                actions.fetchProjectTags(project)
            }
        }
    }

    componentWillUnmount() {
        const {searchActions} = this.props;

        searchActions.removeProjectContext();
    }

    renderComponent = (Component) => {
        const {project} = this.props;

        return (routeProps) => <Fragment>
            <AppSidebar project={project} {...routeProps}/>
            <Component {...routeProps}/>
        </Fragment>;
    };

    render(){
        const {project, tagsLoaded, location, match} = this.props;
        const {nonExistingProject} = this.state;

        if (nonExistingProject) {
            if (isTransactionOrContractUrl(location.pathname)) {
                return <Redirect to={location.pathname.replace(match.url, '')}/>;
            }

            // @TODO Create empty for projects that do not exist or you do not have permission to.
            // Should check if the username is the same as yours if not then display that it ether does not exist
            // or user doesn't have permission.
            return <Redirect to="/dashboard"/>;
        }

        if (!project || !tagsLoaded) {
            return <ProjectPageLoader text="Fetching Project..."/>;
        }

        return (
            <Fragment>
                <Helmet>
                    <title>{project.name} | Tenderly</title>
                </Helmet>
                <Switch>
                    <Route path="/:username/:slug/transactions" render={this.renderComponent(ProjectTransactionsPage)}/>
                    <Route path="/:username/:slug/events" render={this.renderComponent(ProjectEventsPage)}/>
                    <Route path="/:username/:slug/tx/:network/:txHash/:tab?" strict render={this.renderComponent(ProjectTransactionPage)}/>
                    <Route path="/:username/:slug/analytics" exact render={this.renderComponent(ProjectAnalyticsPage)}/>
                    <Route path="/:username/:slug/analytics/create" exact render={this.renderComponent(ProjectCreateGraphPage)}/>
                    <Route path="/:username/:slug/alerts/:tab" render={this.renderComponent(ProjectAlertsPage)}/>
                    <Redirect from="/:username/:slug/alerts" to="/:username/:slug/alerts/rules"/>
                    <Route path="/:username/:slug/wallets" exact render={this.renderComponent(ProjectWalletsPage)}/>
                    <Route path="/:username/:slug/wallets/add" exact render={this.renderComponent(ProjectAddWalletPage)}/>
                    <Route path="/:username/:slug/wallet/:network/:address" render={this.renderComponent(ProjectWalletPage)}/>
                    <Route path="/:username/:slug/contracts" exact render={this.renderComponent(ProjectContractsPage)}/>
                    <Route path="/:username/:slug/contracts/add" exact render={this.renderComponent(ProjectAddContractPage)}/>
                    <Route path="/:username/:slug/contract/:network/:address" render={this.renderComponent(ProjectContractPage)}/>
                    <Route path="/:username/:slug/releases" render={this.renderComponent(ProjectReleasesPage)}/>
                    <Route path="/:username/:slug/security" render={this.renderComponent(ProjectSecurityPage)}/>
                    <Route path="/:username/:slug/private-networks" render={this.renderComponent(ProjectPrivateNetworksPage)}/>
                    <Route path="/:username/:slug/collaborators" exact render={this.renderComponent(ProjectCollaboratorsPage)}/>
                    <Route path="/:username/:slug/collaborators/add" exact render={this.renderComponent(ProjectAddCollaboratorPage)}/>
                    <Route path="/:username/:slug/collaborators/:collaboratorId" strict render={this.renderComponent(ProjectCollaboratorPage)}/>
                    <Route path="/:username/:slug/settings" render={this.renderComponent(ProjectSettingsPage)}/>
                    <Route path="/:username/:slug/usage" render={this.renderComponent(ProjectPlanPage)}/>
                    <Redirect to={`/:username/:slug/transactions`}/>
                </Switch>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug}}} = ownProps;

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        username,
        projectSlug: slug,
        project,
        tagsLoaded: areProjectTagsLoaded(state, project),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
        searchActions: bindActionCreators(searchActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectPage);
