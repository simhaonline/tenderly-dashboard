import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {AlertRule, Contract, Project} from "../../Core/models";

class ExpressionConditionPreview extends PureComponent {
    render() {
        return (
            <div>
                conditonss
            </div>
        )
    }
}

class ExpressionTargetPreview extends PureComponent {
    render() {
        return (
            <div>
                target
            </div>
        )
    }
}

class AlertExpressionsInfo extends PureComponent {
    render() {
        const {rule, contracts, project} = this.props;

        console.log(rule);
        return (
            <div>
                <ExpressionConditionPreview expressions={rule.expressions}/>
                <ExpressionTargetPreview expressions={rule.expressions} contracts={contracts} project={project}/>
            </div>
        );
    }
}

AlertExpressionsInfo.propTypes = {
    rule: PropTypes.instanceOf(AlertRule).isRequired,
    project: PropTypes.instanceOf(Project).isRequired,
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)).isRequired,
};

export default AlertExpressionsInfo;
