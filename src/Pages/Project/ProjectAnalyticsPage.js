import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {getAccountPlanForProject} from "../../Common/Selectors/BillingSelectors";

import {analyticsActions} from "../../Core/actions";

import {Container, Page, PageHeading} from "../../Elements";
import {PaidFeatureButton, ProjectAnalyticsDashboard, ProjectContentLoader} from "../../Components";

class ProjectAnalyticsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            hasCustom: false,
            dashboards: [],
        }
    }

    async componentDidMount() {
        const {analyticsActions, project} = this.props;

        const analyticsResponse = await analyticsActions.fetchCustomAnalyticsForProject(project);

        if (!analyticsResponse.success) {
            return this.setState({
                loading: false,
            });
        }

        let dashboards = [];

        if (analyticsResponse.success) {
            dashboards = analyticsResponse.data;
        }

        this.setState({
            loading: false,
            hasCustom: true,
            currentDashboard: dashboards[0],
            dashboards,
        });
    }

    render() {
        const {project, accountPlan} = this.props;
        const {loading, currentDashboard, dashboards, hasCustom} = this.state;

        return (
            <Page id="ProjectPage" tabs={dashboards.map(d => ({
                route: `${project.getUrlBase()}/analytics?dashboard=${d.id}`,
                label: d.name,
            }))}>
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
                    {!loading && hasCustom && <ProjectAnalyticsDashboard dashboard={currentDashboard} project={project}/>}
                    {!loading && !hasCustom && <div>nista cekaj</div>}
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
