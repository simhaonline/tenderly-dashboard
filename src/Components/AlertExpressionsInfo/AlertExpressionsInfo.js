import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {AlertRule} from "../../Core/models";

class AlertExpressionsInfo extends Component {
    render() {
        const {rule} = this.props;

        console.log(rule);
        return (
            <div>
                expressions
            </div>
        );
    }
}

AlertExpressionsInfo.propTypes = {
    rule: PropTypes.instanceOf(AlertRule).isRequired,
};

export default AlertExpressionsInfo;
