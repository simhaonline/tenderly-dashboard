import React, {Component} from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";

import Analytics from "../../Utils/Analytics";

import {CollaboratorPermissionTypes} from "../../Common/constants";
import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {Container, Page, PageHeading, Button} from "../../Elements";
import {
    ProjectAlertHistory,
    ProjectAlertDestinations,
    ProjectAlertRules,
    ProjectSetupEmptyState,
    PermissionControl,
} from "../../Components";

class ProjectAlertsPage extends Component {
    render() {
        const {project, contracts} = this.props;

        const projectIsSetup = !!project.lastPushAt || contracts.length > 0;

        return (
            <Page id="ProjectPage">
                <Container>
                    <PageHeading>
                        <h1>Alerting</h1>
                        <div className="MarginLeftAuto">
                            <PermissionControl project={project} requiredPermission={CollaboratorPermissionTypes.CREATE_ALERT}>
                                <Button onClick={() => Analytics.trackEvent('create_alert_button_clicked')} to={`/${project.owner}/${project.slug}/alerts/rules/create`}>
                                    <span>New Alert</span>
                                </Button>
                            </PermissionControl>
                        </div>
                    </PageHeading>
                    {!projectIsSetup && <ProjectSetupEmptyState project={project}/>}
                    {projectIsSetup && <Switch>
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
    }
};

export default connect(
    mapStateToProps,
    null
)(ProjectAlertsPage);
