import React, {Component} from 'react';

import {Card, CardHeading, SegmentedControls} from "../../Elements";
import {AnalyticsResolutionTypes} from "../../Common/constants";

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
        const {children, title, resolution} = this.props;

        return (
            <Card className="ProjectAnalyticsGraph">
                <CardHeading>
                    <h4>{title}</h4>
                </CardHeading>
                <div className="GraphSubHeader">
                    <SegmentedControls options={ResolutionOptions} value={resolution} onChange={this.handleResolutionChange}/>
                </div>
                <div className="GraphBody">
                    {children}
                </div>
            </Card>
        )
    }
}

ProjectAnalyticsGraph.defaultProps = {
    resolution: AnalyticsResolutionTypes.DAY,
    onResolutionChange: () => {},
};

export default ProjectAnalyticsGraph;
