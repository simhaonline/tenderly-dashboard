import React, {Component} from 'react';
import classNames from 'classnames';

import {Panel, PanelHeader, PanelContent, SegmentedControls} from "../../Elements";
import {AnalyticsResolutionTypes} from "../../Common/constants";

import './ProjectAnalyticsGraph.scss';

const ResolutionOptions = [
    {
        value: AnalyticsResolutionTypes.HOUR,
        label: 'Hour',
    },
    {
        value: AnalyticsResolutionTypes.DAY,
        label: 'Day',
    },
    {
        value: AnalyticsResolutionTypes.WEEK,
        label: 'Week',
    },
    {
        value: AnalyticsResolutionTypes.MONTH,
        label: 'Month',
    },
];

class ProjectAnalyticsGraph extends Component {
    handleResolutionChange = (resolution) => {
        const {onResolutionChange} = this.props;

        onResolutionChange(resolution);
    };

    render() {
        const {children, title, resolution, className} = this.props;

        return (
            <Panel className={classNames(
                "ProjectAnalyticsGraph",
                className,
            )}>
                <PanelHeader>
                    <h3>{title}</h3>
                </PanelHeader>
                <PanelContent>
                    <div className="GraphSubHeader">
                        <SegmentedControls options={ResolutionOptions} value={resolution} onChange={this.handleResolutionChange}/>
                    </div>
                    <div className="GraphBody">
                        {children}
                    </div>
                </PanelContent>
            </Panel>
        )
    }
}

ProjectAnalyticsGraph.defaultProps = {
    resolution: AnalyticsResolutionTypes.DAY,
    onResolutionChange: () => {},
};

export default ProjectAnalyticsGraph;
