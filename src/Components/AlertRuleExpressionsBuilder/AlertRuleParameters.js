import React from 'react';
import PropTypes from 'prop-types';

import {Select} from "../../Elements";

function AlertRuleParameters(props) {
    return (
        <div>
            <div className="AlertRuleBuilderInput--AlertParameters AlertRuleBuilderInput">
                <div className="AlertRuleBuilderInput__Label">
                    Parameters
                </div>
            </div>
        </div>
    );
}

AlertRuleParameters.propTypes = {

};

export default AlertRuleParameters;
