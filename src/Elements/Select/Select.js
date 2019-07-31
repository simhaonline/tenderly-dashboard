import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

import Icon from "../Icon/Icon";

import './Select.scss';

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

                onChange(newValue, field);
            } else {
                onChange([
                    ...value,
                    item,
                ], field);
            }
        } else {
            onChange(item, field);
            this.closeDropdown();
        }

    };

    render() {
        const {options, value: rawValue, multiple, selectLabel} = this.props;
        const {open} = this.state;

        const value = rawValue || '';

        const selectedOption = options.find(option => option.value === value);

        return (
            <div className={classNames("Select", {
                "OpenDropdown": open,
            })}>
                <OutsideClickHandler onOutsideClick={this.closeDropdown}>
                    <div className="CurrentSelection" onClick={this.toggleDropdown}>
                        {!value.length && <span>{selectLabel}</span>}
                        {!multiple && !!selectedOption && <Fragment>
                            {!!selectedOption.icon && <Icon icon={selectedOption.icon} className="MarginRight1"/>}
                            <span>{selectedOption.label}</span>
                        </Fragment>}
                        {multiple && !!value.length && <span>{value.length} items selected</span>}
                    </div>
                    <div className="SelectDropdown">
                        <div className="DropdownOptionsWrapper">
                            {options.map(option => <div className={classNames("DropdownOption", {
                                "MultipleOption": multiple,
                                "Active": value.includes(option.value),
                            })} key={option.value} onClick={() => {this.handleSelection(option.value)}}>
                                {!!option.icon && <Icon icon={option.icon} className="MarginRight1"/>}
                                <span>{option.label}</span>
                            </div>)}
                        </div>
                    </div>
                </OutsideClickHandler>
            </div>
        );
    }
}

Select.propTypes = {
    value: PropTypes.any,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
        description: PropTypes.string,
        disabled: PropTypes.bool,
    })).isRequired,
    selectLabel: PropTypes.string,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
};

Select.defaultProps = {
    value: '',
    multiple: false,
    onChange: () => {},
    selectLabel: 'Select option',
};

export default Select;
