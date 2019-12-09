import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {PlanUsageTypes, UserPlanTypes} from "../../Common/constants";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {analyticsActions} from "../../Core/actions";

import {Container, Page, PageHeading} from "../../Elements";
import {PaidFeatureButton, ProjectAnalyticsDashboard, ProjectContentLoader} from "../../Components";
import {getAccountPlanForProject} from "../../Common/Selectors/BillingSelectors";

class ProjectAnalyticsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        }
    }

    async componentDidMount() {
        const {analyticsActions, project} = this.props;

        const analyticsResponse = await analyticsActions.fetchAnalyticsForProject(project);

        let widgets = [];

        if (analyticsResponse.success) {
            widgets = analyticsResponse.data.widgets;
        }

        this.setState({
            loading: false,
            widgets,
        });
    }

    render() {
        const {project, accountPlan} = this.props;
        const {loading, widgets} = this.state;

        return (
            <Page id="ProjectPage">
                <Container>
                    <PageHeading>
                        <h1>Analytics</h1>
                        <div className="MarginLeftAuto">
                            <PaidFeatureButton to={`${project.getUrlBase()}/analytics/create`} plan={accountPlan} includes="analytics.advanced">
                                Create Graph
                            </PaidFeatureButton>
                        </div>
                    </PageHeading>
                    {loading && <ProjectContentLoader text="Fetching analytics dashboard..."/>}
                    {!loading && <ProjectAnalyticsDashboard widgets={widgets} project={project}/>}
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
        accountPlan: getAccountPlanForProject(state, project),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        analyticsActions: bindActionCreators(analyticsActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectAnalyticsPage);
