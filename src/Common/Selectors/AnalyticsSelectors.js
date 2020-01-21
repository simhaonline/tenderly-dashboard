export function areCustomDashboardsLoadedForProject(state, projectId) {
    return !!state.analytics.projectDashboardsLoaded[projectId];

}

export function getCustomDashboardsForProject(state, projectId) {
    if (!state.analytics.projectCustomDashboards[projectId]){
        return []
    }
    return state.analytics.projectCustomDashboards[projectId];
}

export function getAnalyticsDashboardsForProject(state, projectId) {
    if (!state.analytics.projectDashboards[projectId]){
        return []
    }
    return state.analytics.projectDashboards[projectId];
}


export function getAnalyticsDashboardForWidget(state, projectId, widgetId) {
    const dashboards = getAnalyticsDashboardsForProject(state, projectId);
    if(dashboards.length===0){
        return null
    }

    let analyticsDashboard = null;

    dashboards.forEach(dashboard => {
        if(dashboard.widgets.find(dashboardWidget=> dashboardWidget.id===widgetId)){
            analyticsDashboard = dashboard
        }
    });
    return analyticsDashboard;
}

export function getCustomDashboardWidgetForProject(state, projectId, widgetId) {

    const dashboard = getAnalyticsDashboardForWidget(state, projectId, widgetId);

    if(!dashboard){
        return null
    }

    return dashboard.widgets.find(dashboardWidget=> dashboardWidget.id===widgetId);
}