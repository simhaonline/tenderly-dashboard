import React, {Component} from "react";

import {Card, Icon} from "../../Elements";

class AlertRuleBuilderOption extends Component {
    render() {
        const {icon, label, description, highlightColor, onClick, selected, disabled} = this.props;

        return (
            <Card color="light" className="AlertRuleBuilderOption" highlightColor={highlightColor} selectable selected={selected} onClick={onClick} disabled={disabled}>
                <Icon icon={icon} className="AlertRuleBuilderOption__Icon"/>
                <h5 className="AlertRuleBuilderOption__Label">{label}</h5>
                <p className="AlertRuleBuilderOption__Description">{description}</p>
            </Card>
        )
    }
}

export default AlertRuleBuilderOption;
