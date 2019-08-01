import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";

import {areAlertRulesLoadedForProject, getAlertRulesForProject} from "../../Common/Selectors/AlertingSelectors";

class AlertRulesList extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {projectId}}} = ownProps;

    console.log('project', projectId)

    return {
        projectId,
        rules: getAlertRulesForProject(state, projectId),
        areRulesLoaded: areAlertRulesLoadedForProject(state, projectId),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(alertingActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertRulesList);
