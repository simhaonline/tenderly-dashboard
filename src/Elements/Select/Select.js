import React, {Component} from 'react';
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

import './Select.css';

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }
    }

    closeDropdown = () => {
        this.setState({
            open: false,
        })
    };

    toggleDropdown = () => {
        this.setState({
            open: !this.state.open,
        })
    };

    handleSelection = (item) => {
        const {onChange, field, multiple, value} = this.props;

        if (multiple) {
            if (value.includes(item)) {
                const newValue = value.filter(data => data !== item);

                onChange(field, newValue);
            } else {
                onChange(field, [
                    ...value,
                    item,
                ]);
            }
        } else {
            onChange(field, item);
            this.closeDropdown();
        }

    };

    render() {
        const {options, value, multiple, selectLabel} = this.props;
        const {open} = this.state;

        const selectedOption = options.find(option => option.value === value);

        return (
            <div className={classNames("Select", {
                "OpenDropdown": open,
            })}>
                <OutsideClickHandler onOutsideClick={this.closeDropdown}>
                    <div className="CurrentSelection" onClick={this.toggleDropdown}>
                        {!value.length && <span>{selectLabel}</span>}
                        {!multiple && !!selectedOption && <span>{selectedOption.label}</span>}
                        {multiple && !!value.length && <span>{value.length} items selected</span>}
                    </div>
                    <div className="SelectDropdown">
                        <div className="DropdownOptionsWrapper">
                            {options.map(option => <div className={classNames("DropdownOption", {
                                "MultipleOption": multiple,
                                "Active": value.includes(option.value),
                            })} key={option.value} onClick={() => {this.handleSelection(option.value)}}>
                                <span>{option.label}</span>
                            </div>)}
                        </div>
                    </div>
                </OutsideClickHandler>
            </div>
        );
    }
}

Select.defaultProps = {
    value: '',
    multiple: false,
    onChange: () => {},
    selectLabel: 'Select option',
};

export default Select;
