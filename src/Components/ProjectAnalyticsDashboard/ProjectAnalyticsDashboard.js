import React, {Component} from 'react';

import {AnalyticsWidget} from "../index";

import './ProjectAnalyticsDashboard.scss';

class ProjectAnalyticsDashboard extends Component {
    render() {
        const {widgets} = this.props;

        return (
            <div className="ProjectAnalyticsDashboard">
                {(widgets && widgets.length > 0) && <div className="ProjectAnalyticsDashboard__WidgetsWrapper">
                    {widgets.map(widget => <AnalyticsWidget key={widget.id} widget={widget}/>)}
                </div>}
            </div>
        );
    }
}

export default ProjectAnalyticsDashboard;
