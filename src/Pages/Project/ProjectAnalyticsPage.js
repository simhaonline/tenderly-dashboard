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
    areCustomDashboardsLoadedForProject,
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
        const {analyticsActions, project, loadedDashboards, customDashboards} = this.props;
        if(loadedDashboards){
            return this.setState({
                currentDashboard: customDashboards[0].id

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
        const {loadedDashboards, customDashboards} = this.props;
        if(prevProps.loadedDashboards!== loadedDashboards){
            this.setState({
                currentDashboard: customDashboards[0].id
            })
        }
    }

    render() {
        const {project, accountPlan, loadedDashboards, customDashboards} = this.props;
        const {currentDashboard, forceLoaded} = this.state;

        const loading = !forceLoaded && (!loadedDashboards || !currentDashboard);


        return (
            <Page id="ProjectPage" tabs={customDashboards.map(d => ({
                route: `${project.getUrlBase()}/analytics?dashboard=${d.id}`,
                label: d.name,
            }))}>
                <Container>
                    <PageHeading>
                        <h1>Analytics</h1>
                        <div className="MarginLeftAuto">
                            <FeatureFlag flag={FeatureFlagTypes.ANALYTICS}>
                                <PaidFeatureButton to={`${project.getUrlBase()}/analytics/create`} plan={accountPlan} includes="analytics.advanced">
                                    Create Graph
                                </PaidFeatureButton>
                            </FeatureFlag>
                        </div>
                    </PageHeading>
                    {loading && <ProjectContentLoader text="Fetching analytics dashboard..."/>}
                    {!loading && customDashboards.length>0 && <ProjectAnalyticsDashboard dashboard={customDashboards.find(dashboard => dashboard.id===currentDashboard)} project={project}/>}
                    {!loading && customDashboards.length===0 && <div>
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
        customDashboards: getCustomDashboardsForProject(state,project.id)
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
