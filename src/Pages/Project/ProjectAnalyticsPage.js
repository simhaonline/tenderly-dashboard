import React, {Component} from 'react';
import {connect} from "react-redux";

import {getProject} from "../../Common/Selectors/ProjectSelectors";
import {FeatureFlagTypes} from "../../Common/constants";

import {Container, Page, PageHeading} from "../../Elements";
import {ProjectAnalyticsDashboard, FeatureFlag, FeatureComingSoon} from "../../Components";

import dashboardData from './AnalyticsDashboardData';

class ProjectAnalyticsPage extends Component {
    render() {
        return (
            <Page id="ProjectPage">
                <Container>
                    <PageHeading>
                        <h1>Analytics</h1>
                    </PageHeading>
                    <FeatureFlag flag={FeatureFlagTypes.ANALYTICS} reverse>
                        <FeatureComingSoon feature="analytics"/>
                    </FeatureFlag>
                    <FeatureFlag flag={FeatureFlagTypes.ANALYTICS}>
                        <ProjectAnalyticsDashboard dashboard={dashboardData}/>
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
)(ProjectAnalyticsPage);
