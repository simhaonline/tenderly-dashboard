import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Checkbox.scss';
import {Icon} from "../index";

class Checkbox extends Component {
    handleCheckboxToggle = (event) => {
        const {field, onChange, value} = this.props;
        const newValue = !value;

        if (onChange && field) {
            onChange(field, newValue, event)
        }
    };

    render() {
        const {field, value, label, renderLabel} = this.props;

        const hasLabel = label || renderLabel;

        return (
            <div className="Checkbox">
                <div className="CheckboxInputWrapper">
                    <input type="checkbox" className="CheckboxInput" id={`input-${field}`}
                           onChange={this.handleCheckboxToggle}
                           name={field} checked={value}/>
                    <div className="CheckboxIconWrapper">
                        <Icon icon="check" className="CheckboxIcon"/>
                    </div>
                </div>
                {hasLabel && <label htmlFor={`input-${field}`} className="CheckboxLabel">
                    {renderLabel ? renderLabel() : label}
                </label>}
            </div>
        );
    }
}

Checkbox.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    label: PropTypes.string,
    renderLabel: PropTypes.func,
    onChange: PropTypes.func.isRequired,
};

export default Checkbox;
