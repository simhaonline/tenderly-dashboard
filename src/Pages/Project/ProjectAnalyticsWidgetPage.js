import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {analyticsActions} from "../../Core/actions";

import {Button, Container, Icon, Page, PageHeading} from "../../Elements";
import {AnalyticsDataView, ProjectContentLoader} from "../../Components";
import {
    areCustomDashboardsLoadedForProject, getAnalyticsDashboardForWidget,
    getCustomDashboardWidgetForProject
} from "../../Common/Selectors/AnalyticsSelectors";

class ProjectAnalyticsWidgetPage extends Component {

    async componentDidMount() {
        const {analyticsActions, project, loadedDashboards} = this.props;
        if(!loadedDashboards){
            analyticsActions.fetchAnalyticsForProject(project);
        }
    }

    render() {
        const {project, loadedDashboards, analyticsWidget, dashboard} = this.props;

        return (
            <Page id="ProjectPage">
                <Container>
                    {!loadedDashboards && <ProjectContentLoader text="Fetching analytics dashboard..."/>}
                    {loadedDashboards && <Fragment>
                        <PageHeading>
                            <Button outline to={`${project.getUrlBase()}/analytics`}>
                                <Icon icon="arrow-left"/>
                            </Button>
                            <h1>{analyticsWidget.name}</h1>
                        </PageHeading>
                        <AnalyticsDataView widget={analyticsWidget} project={project} dashboard={dashboard}/>
                    </Fragment>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug, widgetId}}} = ownProps;
    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        project,
        loadedDashboards: areCustomDashboardsLoadedForProject(state, project.id),
        analyticsWidget: getCustomDashboardWidgetForProject(state, project.id, widgetId),
        dashboard: getAnalyticsDashboardForWidget(state, project.id, widgetId),
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
)(ProjectAnalyticsWidgetPage);
