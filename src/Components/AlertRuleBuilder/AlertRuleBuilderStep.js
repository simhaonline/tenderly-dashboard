import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

import {Icon} from "../../Elements";

class AlertRuleBuilderStep extends Component {
    render() {
        const {completed, onToggle, children, open, number, label, description} = this.props;

        return (
            <div>
                <div className={classNames(
                    "AlertRuleBuilder__StepHeader",
                    {
                        "AlertRuleBuilder__StepHeader--Finished": completed,
                    },
                )} onClick={onToggle}>
                    <div className={classNames(
                        "AlertRuleBuilder__StepIcon",
                        {
                            "AlertRuleBuilder__StepIcon--Finished": completed,
                        },
                    )}>
                        {!completed && <span>{number}</span>}
                        {completed && <Icon icon="check"/>}
                    </div>
                    <div className="AlertRuleBuilder__StepInfo">
                        <h5 className="AlertRuleBuilder__StepInfo__Heading">{label}</h5>
                        <p className="AlertRuleBuilder__StepInfo__Description">{description}</p>
                    </div>
                </div>
                {open && <div className="AlertRuleBuilder__Body">
                    <div className="AlertRuleBuilder__Body__Divider"/>
                    <div className="AlertRuleBuilder__Body__Content">
                        {children}
                    </div>
                </div>}
            </div>
        );
    }
}

AlertRuleBuilderStep.propTypes = {
    completed: PropTypes.bool,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    number: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default AlertRuleBuilderStep;
