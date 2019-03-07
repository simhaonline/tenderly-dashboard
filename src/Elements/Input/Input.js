import React, {Component} from 'react';
import classNames from 'classnames';

import Icon from "../Icon/Icon";

import './Input.css';

class InputElement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
        }
    }

    handleInputChange = (event) => {
        const {field, onChange, disabled} = this.props;

        if (disabled) {
            return;
        }

        const newValue = event.target.value;

        if (onChange && field) {
            onChange(field, newValue, event)
        }
    };

    handleInputFocus = () => {
        this.setState({
            focused: true,
        });

    };

    handleInputBlur = () => {
        this.setState({
            focused: false,
        });
    };

    render() {
        const {value, type, field, label, icon, autoFocus, autoComplete, placeholder, disabled} = this.props;
        const {focused} = this.state;

        return (
            <div className={classNames("InputWrapper", {
                'Active': !!value,
                'Focused': focused,
                'WithIcon': !!icon,
                'Disabled': disabled,
            })}>
                {!!icon && <Icon icon={icon} className="InputIcon"/>}
                {(!!label && !value) && <label htmlFor={`input-${field}`} className={"InputLabel"}>{label}</label>
                }
                <input type={type || "text"}
                       className="Input"
                       id={`input-${field}`}
                       name={field}
                       placeholder={placeholder}
                       autoFocus={autoFocus}
                       autoComplete={autoComplete}
                       value={value}
                       disabled={disabled}
                       onChange={this.handleInputChange}
                       onFocus={this.handleInputFocus}
                       onBlur={this.handleInputBlur}/>
            </div>
        );
    }
}

export default InputElement;
