import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {AnalyticsDashboard, Project} from "../../Core/models";

import {AnalyticsWidget} from "../index";

import './ProjectAnalyticsDashboard.scss';

class ProjectAnalyticsDashboard extends Component {
    render() {
        const {dashboard, project} = this.props;

        console.log(dashboard);

        return (
            <div className="ProjectAnalyticsDashboard">
                {/*{(widgets && widgets.length > 0) && <div className="ProjectAnalyticsDashboard__WidgetsWrapper">*/}
                {/*    {widgets.map(widget => <AnalyticsWidget key={widget.id} widget={widget} project={project}/>)}*/}
                {/*</div>}*/}
            </div>
        );
    }
}

ProjectAnalyticsDashboard.propTypes = {
    dashboard: PropTypes.instanceOf(AnalyticsDashboard).isRequired,
    project: PropTypes.instanceOf(Project).isRequired,
};

export default ProjectAnalyticsDashboard;
