import React, {Component} from 'react';

import {AnalyticsWidget} from "../index";

import './ProjectAnalyticsDashboard.scss';

class ProjectAnalyticsDashboard extends Component {
    render() {
        const {dashboard} = this.props;

        console.log(dashboard);

        return (
            <div className="ProjectAnalyticsDashboard">
                <h3>{dashboard.name}</h3>
                {(dashboard.widgets && dashboard.widgets.length > 0) && <div className="ProjectAnalyticsDashboard__WidgetsWrapper">
                    {dashboard.widgets.map(widget => <AnalyticsWidget key={widget.id} widget={widget}/>)}
                </div>}
            </div>
        );
    }
}

export default ProjectAnalyticsDashboard;
