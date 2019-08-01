import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {AlertRuleExpression} from "../../Core/models";

import {Select} from "../../Elements";
import {AlertRuleExpressionTypes} from "../../Common/constants";

class AlertRuleExpressionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: null,
        };
    }

    handleTypeSelect = (value) => {
        this.setState({
            type: value,
        }, this.propagateChanges);
    };

    propagateChanges = () => {
        const {onChange} = this.props;
        const {type} = this.state;

        const expression = new AlertRuleExpression({
            type,
        });

        onChange(expression);
    };

    render() {
        const {type} = this.state;

        const expressionOptions = Object.values(AlertRuleExpressionTypes).map(expressionType => ({
            label: expressionType,
            value: expressionType,
        }));

        return (
            <div className="AlertRuleExpressionForm">
                <Select value={type} options={expressionOptions} selectLabel="Trigger alert based on" onChange={this.handleTypeSelect}/>
            </div>
        );
    }
}

AlertRuleExpressionForm.propTypes = {
    initial: PropTypes.instanceOf(AlertRuleExpression),
    disabledOptions: PropTypes.arrayOf(PropTypes.oneOf(Object.values(AlertRuleExpressionTypes))),
    onChange: PropTypes.func,
};

AlertRuleExpressionForm.defaultProps = {
    onChange: () => {},
};

export default AlertRuleExpressionForm;
