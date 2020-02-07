import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {AnalyticsDashboard, Project} from "../../Core/models";

import {AnalyticsWidget} from "../index";

import './ProjectAnalyticsDashboard.scss';

class ProjectAnalyticsDashboard extends Component {
    render() {
        const {dashboard, project, filters} = this.props;
        return (
            <div className="ProjectAnalyticsDashboard">
                {(dashboard && dashboard.widgets.length > 0) && <div className="ProjectAnalyticsDashboard__WidgetsWrapper">
                    {dashboard.widgets.map(widget => <AnalyticsWidget key={widget.id} isCustom={dashboard.isCustom} dashboard={dashboard}
                                                                      widget={widget} project={project} filters={filters}/>)}
                </div>}
            </div>
        );
    }
}

ProjectAnalyticsDashboard.propTypes = {
    dashboard: PropTypes.instanceOf(AnalyticsDashboard).isRequired,
    project: PropTypes.instanceOf(Project).isRequired,
};

export default ProjectAnalyticsDashboard;
