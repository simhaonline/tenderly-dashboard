import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";

import {getAlertRule, isAlertRuleLoaded} from "../../Common/Selectors/AlertingSelectors";

class EditAlertRuleForm extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {ruleId}}} = ownProps;

    console.log('rule', ruleId);

    return {
        rule: getAlertRule(state, ruleId),
        isRuleLoaded: isAlertRuleLoaded(state, ruleId),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(alertingActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditAlertRuleForm);
