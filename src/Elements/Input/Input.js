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
        const {field, onChange} = this.props;
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
        const {value, type, field, label, icon, autoFocus, autoComplete} = this.props;
        const {focused} = this.state;

        return (
            <div className={classNames("InputWrapper", {
                'Active': !!value,
                'Focused': focused,
            })}>
                {!!icon && <Icon icon={icon} className="InputIcon"/>}
                {(!!label && !value) && <label htmlFor={`input-${field}`} className={"InputLabel"}>{label}</label>
                }
                <input type={type || "text"}
                       className="Input"
                       id={`input-${field}`}
                       name={field}
                       autoFocus={autoFocus}
                       autoComplete={autoComplete}
                       value={value}
                       onChange={this.handleInputChange}
                       onFocus={this.handleInputFocus}
                       onBlur={this.handleInputBlur}/>
            </div>
        );
    }
}

export default InputElement;
