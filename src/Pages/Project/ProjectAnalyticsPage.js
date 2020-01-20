import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {getAccountPlanForProject} from "../../Common/Selectors/BillingSelectors";

import {analyticsActions} from "../../Core/actions";

import {Container, Page, PageHeading, Panel} from "../../Elements";

import {
    EmptyState,
    FeatureFlag,
    PaidFeatureButton,
    ProjectAnalyticsDashboard,
    ProjectContentLoader
} from "../../Components";
import {
    areCustomDashboardsLoadedForProject, getAnalyticsDashboardsForProject,
    getCustomDashboardsForProject
} from "../../Common/Selectors/AnalyticsSelectors";
import {FeatureFlagTypes} from "../../Common/constants";

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
        const {analyticsActions, project, loadedDashboards, dashboards} = this.props;
        if(loadedDashboards){
            return this.setState({
                currentDashboard: dashboards[0].id

            })
        }
        const analyticsResponse = await analyticsActions.fetchCustomAnalyticsForProject(project);

        if (!analyticsResponse.success) {

            return this.setState({
                forceLoaded: true,
            })
        }

        this.setState({
            currentDashboard:  analyticsResponse.data[0].id,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {loadedDashboards, dashboards} = this.props;
        if(prevProps.loadedDashboards!== loadedDashboards){
            this.setState({
                currentDashboard: dashboards[0].id
            })
        }
    }

    render() {
        const {project, accountPlan, loadedDashboards, dashboards} = this.props;
        const {currentDashboard, forceLoaded} = this.state;

        const loading = !forceLoaded && (!loadedDashboards || !currentDashboard);


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
                    {!loading && dashboards.length>0 && <ProjectAnalyticsDashboard dashboard={dashboards.find(dashboard => dashboard.id===currentDashboard)} project={project}/>}
                    {!loading && dashboards.length===0 && <div>
                        <Panel>
                            <EmptyState title="Coming soon" description="The analytics feature is currently under development" icon="bar-chart-2" />
                        </Panel>
                    </div>}
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
        loadedDashboards: areCustomDashboardsLoadedForProject(state, project.id),
        dashboards: getAnalyticsDashboardsForProject(state,project.id)
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
