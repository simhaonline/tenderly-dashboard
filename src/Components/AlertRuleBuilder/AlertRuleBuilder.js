import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {AlertRule} from "../../Core/models";

const AlertRuleBuilderSteps = {
    TYPE: 'type',
    TARGET: 'target',
    PARAMETERS: 'parameters',
    DESTINATIONS: 'destinations',
};

class AlertRuleBuilder extends Component {
    constructor(props) {
        super(props);

        // @TODO handle initial rule
        this.state = {};
    }

    render() {
        return (
            <div className="AlertRuleBuilder">
                alert rule builder
            </div>
        );
    }
}

AlertRuleBuilder.propTypes = {
    initialRule: PropTypes.instanceOf(AlertRule),
    step: PropTypes.oneOf(Object.values(AlertRuleBuilderSteps)),
};

export default AlertRuleBuilder;
