import React, {Component} from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";

import Analytics from "../../Utils/Analytics";

import {CollaboratorPermissionTypes} from "../../Common/constants";
import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {Container, Page, PageHeading, Button} from "../../Elements";
import {
    PageSegments,
    PageSegmentSwitcher,
    PageSegmentContent,
    ProjectAlertHistory,
    ProjectAlertDestinations,
    ProjectAlertRules,
    ProjectSetupEmptyState,
    PermissionControl,
} from "../../Components";

const RULES_TAB = 'rules';
const HISTORY_TAB = 'history';
const INTEGRATIONS_TAB = 'destinations';

const PageSegmentsOptions = [
    {
        label: 'Alerts',
        description: 'Setup custom rules and triggers for alerts',
        value: RULES_TAB,
    },
    {
        label: 'History',
        description: 'View alerts that were triggered and sent',
        value: HISTORY_TAB,
    },
    {
        label: 'Destinations',
        description: 'Set alert destinations like email, slack etc.',
        value: INTEGRATIONS_TAB,
    },
];

class ProjectAlertsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSegment: props.initialTab || RULES_TAB,
        }
    }

    /**
     * @param {String} segment
     */
    handleSegmentSwitch = (segment) => {
        const {project} = this.props;

        this.props.history.push(`/${project.owner}/${project.slug}/alerts/${segment}`);

        this.setState({
            currentSegment: segment,
        });
    };

    render() {
        const {project, contracts} = this.props;
        const {currentSegment} = this.state;

        const projectIsSetup = contracts.length > 0;

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
                    {projectIsSetup && <PageSegments>
                        <PageSegmentSwitcher current={currentSegment} options={PageSegmentsOptions} onSelect={this.handleSegmentSwitch}/>
                        <Switch>
                            <Route path={`/:username/:slug/alerts/rules`} render={() => <PageSegmentContent>
                                <ProjectAlertRules/>
                            </PageSegmentContent>}/>
                            <Route path={`/:username/:slug/alerts/history`} render={() => <PageSegmentContent>
                                <ProjectAlertHistory project={project}/>
                            </PageSegmentContent>}/>
                            <Route path={`/:username/:slug/alerts/destinations`} render={() => <PageSegmentContent>
                                <ProjectAlertDestinations/>
                            </PageSegmentContent>}/>
                        </Switch>
                    </PageSegments>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug, tab}}} = ownProps;

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        initialTab: tab,
        project,
        contracts: getContractsForProject(state, project.id),
    }
};

export default connect(
    mapStateToProps,
    null
)(ProjectAlertsPage);
