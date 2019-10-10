import React, {Component} from 'react';

import {AnalyticsWidget} from "../index";

import './ProjectAnalyticsDashboard.scss';

class ProjectAnalyticsDashboard extends Component {
    render() {
        const {dashboard} = this.props;

        return (
            <div className="ProjectAnalyticsDashboard">
                {(dashboard.widgets && dashboard.widgets.length > 0) && <div className="ProjectAnalyticsDashboard__WidgetsWrapper">
                    {dashboard.widgets.map(widget => <AnalyticsWidget key={widget.id} widget={widget}/>)}
                </div>}
            </div>
        );
    }
}

export default ProjectAnalyticsDashboard;
