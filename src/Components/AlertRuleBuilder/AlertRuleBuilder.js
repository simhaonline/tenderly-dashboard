import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {AlertRule} from "../../Core/models";

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
};

export default AlertRuleBuilder;
