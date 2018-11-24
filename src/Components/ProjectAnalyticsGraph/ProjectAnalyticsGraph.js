import React, {Component} from 'react';

import {Card, CardHeading, CardBody} from "../../Elements";

class ProjectAnalyticsGraph extends Component {

    handleResolutionChange = (resolution) => {
        const {onResolutionChange} = this.props;

        onResolutionChange(resolution);
    };

    render() {
        const {children, title} = this.props;
        return (
            <Card className="ProjectAnalyticsGraph">
                <CardHeading>
                    <h4>{title}</h4>
                </CardHeading>
                <div className="GraphBody">
                    {children}
                </div>
            </Card>
        )
    }
}

ProjectAnalyticsGraph.defaultProps = {
    onResolutionChange: () => {},
};

export default ProjectAnalyticsGraph;
