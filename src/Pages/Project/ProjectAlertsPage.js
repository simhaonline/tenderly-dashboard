import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {bindActionCreators} from "redux";

import Analytics from "../../Utils/Analytics";

import {CollaboratorPermissionTypes, PlanUsageTypes} from "../../Common/constants";
import {areProjectContractsLoaded, getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {contractActions} from "../../Core/actions";

import {Container, Page, PageHeading, Button} from "../../Elements";
import {
    ProjectAlertHistory,
    ProjectAlertDestinations,
    ProjectAlertRules,
    ProjectSetupEmptyState,
    PermissionControl, ExampleProjectInfoModal,
} from "../../Components";
import {getAccountPlanForProject} from "../../Common/Selectors/BillingSelectors";
import PaidFeatureButton from "../../Components/PaidFeatureButton/PaidFeatureButton";

class ProjectAlertsPage extends Component {
    state = {
        loaded: false,
        exampleProjectModalOpen: false,
    };

    async componentDidMount() {
        const {contractActions, project, contractsLoaded} = this.props;

        if (!contractsLoaded) {
            await contractActions.fetchContractsForProject(project);
        }

        this.setState({
            loaded: true,
        });
    }

    setExampleProjectModalOpen = (value) => {
        this.setState({
            exampleProjectModalOpen: value,
        })
    };

    render() {
        const {project, contracts, accountPlan} = this.props;
        const {loaded, exampleProjectModalOpen} = this.state;
        const isDemoProject = project.isDemoProject();
        const projectIsSetup = contracts.length > 0;

        return (
            <Page id="ProjectPage">
                <Container>
                    <PageHeading>
                        <h1>Alerting</h1>
                        <div className="MarginLeftAuto">
                            {!isDemoProject && <PermissionControl project={project} requiredPermission={CollaboratorPermissionTypes.CREATE_ALERT}>
                                <PaidFeatureButton plan={accountPlan}  usage={PlanUsageTypes.ALERT_USAGE} onClick={() => Analytics.trackEvent('create_alert_button_clicked')} to={`/${project.owner}/${project.slug}/alerts/rules/create`}>
                                    <span>New Alert</span>
                                </PaidFeatureButton>
                            </PermissionControl>}
                            {isDemoProject && <Fragment>
                                <Button onClick={()=>this.setExampleProjectModalOpen(true)}>
                                    <span>New Alert</span>
                                </Button>
                                <ExampleProjectInfoModal header="Example Project"
                                                         description="This is just an example project to illustrate what the platform can do. If you wish to setup alerting for your contracts first create a project and your contracts to that project."
                                                         onClose={()=>this.setExampleProjectModalOpen(false)}
                                                         open={exampleProjectModalOpen}/>
                            </Fragment>}
                        </div>
                    </PageHeading>
                    {!projectIsSetup && loaded && <ProjectSetupEmptyState project={project}/>}
                    {projectIsSetup && loaded && <Switch>
                        <Route path={`/:username/:slug/alerts/rules`} component={ProjectAlertRules}/>
                        <Route path={`/:username/:slug/alerts/history`} render={() => <ProjectAlertHistory project={project}/>}/>
                        <Route path={`/:username/:slug/alerts/destinations`} component={ProjectAlertDestinations}/>
                    </Switch>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug}}} = ownProps;

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        project,
        contracts: getContractsForProject(state, project.id),
        contractsLoaded: areProjectContractsLoaded(state, project.id),
        accountPlan: getAccountPlanForProject(state, project),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        contractActions: bindActionCreators(contractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectAlertsPage);
