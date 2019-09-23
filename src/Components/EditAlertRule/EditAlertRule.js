import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {AlertRuleBuilder} from "..";

class EditAlertRule extends Component {
    render() {
        return (
            <div>
                edit alert rule
                <AlertRuleBuilder/>
            </div>
        );
    }
}

EditAlertRule.propTypes = {

};

export default EditAlertRule;
