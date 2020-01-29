export function areCustomDashboardsLoadedForProject(state, projectId) {
    return !!state.analytics.projectCustomDashboardsLoaded[projectId];

}


export function getCustomDashboardsForProject(state, projectId) {
    if (!state.analytics.projectCustomDashboards[projectId]){
        return []
    }
    return state.analytics.projectCustomDashboards[projectId];
}

export function getCustomDashboardWidgetForProject(state, projectId, widgetId) {

    const dashboards = getCustomDashboardsForProject(state, projectId);
    if(dashboards.length===0){
        return null
    }

    let widget = null;

    dashboards.forEach(dashboard => {
        if(dashboard.widgets.find(dashboardWidget=> dashboardWidget.id===widgetId)){
            widget= dashboard.widgets.find(dashboardWidget=> dashboardWidget.id===widgetId);
        }
    });
    return widget;
}