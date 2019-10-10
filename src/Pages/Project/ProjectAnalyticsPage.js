import React, {Component} from 'react';
import {connect} from "react-redux";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {FeatureFlagTypes} from "../../Common/constants";

import {Container, Page, PageHeading} from "../../Elements";
import {ProjectAnalyticsDashboard, FeatureFlag, FeatureComingSoon, ProjectContentLoader} from "../../Components";

import dashboardData from './AnalyticsDashboardData';

class ProjectAnalyticsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false,
            })
        }, 1100);
    }

    render() {
        const {loading} = this.state;

        return (
            <Page id="ProjectPage">
                <FeatureFlag flag={FeatureFlagTypes.ANALYTICS} reverse>
                    <Container>
                        <PageHeading>
                            <h1>Analytics</h1>
                        </PageHeading>
                        <FeatureComingSoon feature="analytics"/>
                    </Container>
                </FeatureFlag>
                <FeatureFlag flag={FeatureFlagTypes.ANALYTICS}>
                    <PageHeading>
                        <h1>Analytics</h1>
                    </PageHeading>
                    {loading && <ProjectContentLoader text="Fetching analytics dashboard..."/>}
                    {!loading && <ProjectAnalyticsDashboard dashboard={dashboardData}/>}
                </FeatureFlag>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug}}} = ownProps;

    return {
        project: getProjectBySlugAndUsername(state, slug, username),
    }
};

export default connect(
    mapStateToProps,
    null
)(ProjectAnalyticsPage);
