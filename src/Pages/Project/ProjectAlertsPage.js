import React, {Component} from 'react';
import {connect} from "react-redux";

import {getProject} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page, Card, CardHeading} from "../../Elements";
import {PageSegments, PageSegmentSwitcher, PageSegmentContent, FeatureFlag, FeatureComingSoon} from "../../Components";
import {FeatureFlagTypes} from "../../Common/constants";

const PageSegmentsOptions = [
    {
        label: 'Events',
        value: 'events',
    },
    {
        label: 'Analytics',
        value: 'analytics',

    },
    {
        label: 'Deployment',
        value: 'deployment',

    },
    {
        label: 'Integrations',
        value: 'integrations',

    },
];

class ProjectAlertsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSegment: 'events',
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
                <FeatureFlag flag={FeatureFlagTypes.ALERTS} reverse>
                    <FeatureComingSoon feature="alerting"/>
                </FeatureFlag>
                <FeatureFlag flag={FeatureFlagTypes.ALERTS}>
                    <Container>
                        <PageSegments>
                            <PageSegmentSwitcher current={currentSegment} options={PageSegmentsOptions} onSelect={this.handleSegmentSwitch}/>
                            {currentSegment === 'events' && <PageSegmentContent>
                                <Card>
                                    <CardHeading>
                                        <h3>Events</h3>
                                    </CardHeading>
                                </Card>
                            </PageSegmentContent>}
                            {currentSegment === 'analytics' && <PageSegmentContent>
                                <Card>
                                    <CardHeading>
                                        <h3>Analytics</h3>
                                    </CardHeading>
                                </Card>
                            </PageSegmentContent>}
                            {currentSegment === 'deployment' && <PageSegmentContent>
                                <Card>
                                    <CardHeading>
                                        <h3>Deployment</h3>
                                    </CardHeading>
                                </Card>
                            </PageSegmentContent>}
                            {currentSegment === 'integrations' && <PageSegmentContent>
                                <Card>
                                    <CardHeading>
                                        <h3>Integrations</h3>
                                    </CardHeading>
                                </Card>
                            </PageSegmentContent>}
                        </PageSegments>
                    </Container>
                </FeatureFlag>
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
