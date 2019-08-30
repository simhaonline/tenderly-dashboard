import React, {Component} from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";

import Analytics from "../../Utils/Analytics";

import {FeatureFlagTypes} from "../../Common/constants";
import {getProject} from "../../Common/Selectors/ProjectSelectors";
import {areAlertRulesLoadedForProject, getAlertRulesForProject} from "../../Common/Selectors/AlertingSelectors";

import {Container, Page, PageHeading, Button} from "../../Elements";
import {
    PageSegments,
    PageSegmentSwitcher,
    PageSegmentContent,
    ProjectAlertHistory,
    ProjectAlertDestinations,
    ProjectAlertRules,
    ProjectSetupEmptyState
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
        featureFlag: FeatureFlagTypes.ALERTS,
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

        this.props.history.push(`/project/${project.id}/alerts/${segment}`);

        this.setState({
            currentSegment: segment,
        });
    };

    render() {
        const {project, areRulesLoaded, rules} = this.props;
        const {currentSegment} = this.state;

        return (
            <Page id="ProjectPage">
                <Container>
                    <PageHeading>
                        <h1>Alerting</h1>
                        <div className="MarginLeftAuto">
                            {areRulesLoaded && !!rules.length && <Button onClick={() => Analytics.trackEvent('create_alert_button_clicked')} to={`/project/${project.id}/alerts/rules/create`}>
                                <span>New Alert</span>
                            </Button>}
                        </div>
                    </PageHeading>
                    {!project.isSetup && <ProjectSetupEmptyState project={project}/>}
                    {project.isSetup && <PageSegments>
                        <PageSegmentSwitcher current={currentSegment} options={PageSegmentsOptions} onSelect={this.handleSegmentSwitch}/>
                        <Switch>
                            <Route path={`/project/${project.id}/alerts/rules`} render={() => <PageSegmentContent>
                                <ProjectAlertRules projectId={project.id}/>
                            </PageSegmentContent>}/>
                            <Route path={`/project/${project.id}/alerts/history`} render={() => <PageSegmentContent>
                                <ProjectAlertHistory projectId={project.id}/>
                            </PageSegmentContent>}/>
                            <Route path={`/project/${project.id}/alerts/destinations`} render={() => <PageSegmentContent>
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
    const {match: {params: {id, tab}}} = ownProps;

    return {
        initialTab: tab,
        project: getProject(state, id),
        rules: getAlertRulesForProject(state, id),
        areRulesLoaded: areAlertRulesLoadedForProject(state, id),
    }
};

export default connect(
    mapStateToProps,
    null
)(ProjectAlertsPage);
