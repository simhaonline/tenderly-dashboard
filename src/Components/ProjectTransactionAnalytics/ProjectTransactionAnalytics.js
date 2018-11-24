import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {AnalyticsResolutionTypes} from "../../Common/constants";

import {ProjectAnalyticsGraph} from "../index";

class ProjectTransactionAnalytics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resolution: AnalyticsResolutionTypes.DAY,
        }
    }

    render() {
        const {resolution} = this.state;

        return (
            <ProjectAnalyticsGraph title="Transactions" resolution={resolution}>
                Helo
            </ProjectAnalyticsGraph>
        );
    }
}

ProjectTransactionAnalytics.propTypes = {
    projectId: PropTypes.string.isRequired,
};

export default connect(
    null,
    null,
)(ProjectTransactionAnalytics);
