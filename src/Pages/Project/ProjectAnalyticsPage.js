import React, {Component} from 'react';
import {connect} from "react-redux";

import {UserPlanTypes} from "../../Common/constants";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page, PageHeading} from "../../Elements";
import {PaidFeatureButton, ProjectAnalyticsDashboard, ProjectContentLoader} from "../../Components";

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
        }, 100);
    }

    render() {
        const {project} = this.props;
        const {loading} = this.state;

        return (
            <Page id="ProjectPage">
                <Container>
                    <PageHeading>
                        <h1>Analytics</h1>
                        <div className="MarginLeftAuto">
                            <PaidFeatureButton to={`${project.getUrlBase()}/analytics/create`} planRequired={UserPlanTypes.PRO}>
                                Create Graph
                            </PaidFeatureButton>
                        </div>
                    </PageHeading>
                    {loading && <ProjectContentLoader text="Fetching analytics dashboard..."/>}
                    {!loading && <ProjectAnalyticsDashboard dashboard={dashboardData}/>}
                </Container>
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
