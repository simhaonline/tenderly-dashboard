import React, {Component} from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";

import Analytics from "../../Utils/Analytics";

import {CollaboratorPermissionTypes} from "../../Common/constants";
import {getMainProjectContracts, getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

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
        const {project} = this.props;

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
                    {!project.isSetup && <ProjectSetupEmptyState project={project}/>}
                    {project.isSetup && <Switch>
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
    }
};

export default connect(
    mapStateToProps,
    null
)(ProjectAlertsPage);
