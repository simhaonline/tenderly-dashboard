import React, {Component} from 'react';
import classNames from 'classnames';

import {Card, CardHeading, SegmentedControls} from "../../Elements";
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
            <Card className={classNames(
                "ProjectAnalyticsGraph",
                className,
            )}>
                <CardHeading>
                    <h3>{title}</h3>
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
