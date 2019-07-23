import React, {Component} from 'react';
import {connect} from "react-redux";

import {getProject} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page, PageHeading} from "../../Elements";
import {PageSegments, PageSegmentSwitcher, PageSegmentContent, FeatureFlag, FeatureComingSoon, ProjectAlertHistory, ProjectAlertIntegrations, ProjectAlertRules} from "../../Components";
import {FeatureFlagTypes} from "../../Common/constants";

const RULES_TAB = 'rules';
const HISTORY_TAB = 'history';
const INTEGRATIONS_TAB = 'integrations';

const PageSegmentsOptions = [
    {
        label: 'Rules',
        description: 'Setup custom rules and triggers for alerts',
        value: RULES_TAB,
    },
    {
        label: 'History',
        description: 'View alerts that were triggered and sent',
        value: HISTORY_TAB,
    },
    {
        label: 'Integrations',
        description: 'Set alert destinations like email, slack etc.',
        value: INTEGRATIONS_TAB,
    },
];

class ProjectAlertsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSegment: RULES_TAB,
        }
    }

    /**
     * @param {String} segment
     */
    handleSegmentSwitch = (segment) => {
        this.setState({
            currentSegment: segment,
        });
    };

    render() {
        const {currentSegment} = this.state;

        return (
            <Page id="ProjectPage">
                <Container>
                    <PageHeading>
                        <h1>Alerting</h1>
                    </PageHeading>
                    <FeatureFlag flag={FeatureFlagTypes.ALERTS} reverse>
                        <FeatureComingSoon feature="alerting"/>
                    </FeatureFlag>
                    <FeatureFlag flag={FeatureFlagTypes.ALERTS}>
                        <PageSegments>
                            <PageSegmentSwitcher current={currentSegment} options={PageSegmentsOptions} onSelect={this.handleSegmentSwitch}/>
                            {currentSegment === RULES_TAB && <PageSegmentContent>
                                <ProjectAlertRules/>
                            </PageSegmentContent>}
                            {currentSegment === HISTORY_TAB && <PageSegmentContent>
                                <ProjectAlertHistory/>
                            </PageSegmentContent>}
                            {currentSegment === INTEGRATIONS_TAB && <PageSegmentContent>
                                <ProjectAlertIntegrations/>
                            </PageSegmentContent>}
                        </PageSegments>
                    </FeatureFlag>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}} = ownProps;

    return {
        project: getProject(state, id),
    }
};

export default connect(
    mapStateToProps,
    null
)(ProjectAlertsPage);
