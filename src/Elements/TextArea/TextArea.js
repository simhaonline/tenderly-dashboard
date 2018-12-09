import React, {Component} from 'react';
import classNames from "classnames";

import './TextArea.css';

class TextArea extends Component {
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
        const {value, autoFocus, field, className, placeholder} = this.props;
        const {focused} = this.state;

        return (
            <div className={classNames("TextAreaWrapper", className, {
                'Active': (value || focused),
                'Focused': focused,
            })}>
                <textarea className="TextArea"
                          value={value}
                          placeholder={placeholder}
                          id={`textarea-${field}`}
                          name={field}
                          autoFocus={autoFocus}
                          onChange={this.handleInputChange}
                          onFocus={this.handleInputFocus}
                          onBlur={this.handleInputBlur}/>
            </div>

        );
    }
}

export default TextArea;
