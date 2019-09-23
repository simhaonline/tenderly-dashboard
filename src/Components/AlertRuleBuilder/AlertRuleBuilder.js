import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {AlertRule} from "../../Core/models";

class AlertRuleBuilder extends Component {
    constructor(props) {
        super(props);

        // @TODO handle initial
        this.state = {};
    }

    render() {
        return (
            <div className="AlertRuleBuilder">

            </div>
        );
    }
}

AlertRuleBuilder.propTypes = {
    initialRule: PropTypes.instanceOf(AlertRule).isRequired,
};

export default AlertRuleBuilder;
