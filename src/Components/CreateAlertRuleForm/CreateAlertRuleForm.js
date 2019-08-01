import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";

class CreateAlertRuleForm extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(alertingActions, dispatch),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(CreateAlertRuleForm);
