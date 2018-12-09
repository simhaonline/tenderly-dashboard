import React, {Component} from 'react';
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

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
            onChange(field, [
                ...value,
                item,
            ]);
        } else {
            onChange(field, item);
        }

    };

    render() {
        const {options, value, multiple} = this.props;
        const {open} = this.state;

        return (
            <div className={classNames("Select", {
                "OpenDropdown": open,
            })}>
                <OutsideClickHandler onOutsideClick={this.closeDropdown}>
                    <div className="CurrentSelection" onClick={this.toggleDropdown}>
                        {!value.length && <span>Select option</span>}
                        {!!value.length && !multiple && <span>{value}</span>}
                        {!!value.length && multiple && <span>{value.length} items selected</span>}
                    </div>
                    <div className="SelectDropdown">
                        <div className="DropdownOptionsWrapper">
                            {options.map(option => <div className={classNames("DropdownOption", {
                                "MultipleOption": multiple,
                            })} key={option.value} onClick={() => {this.handleSelection(item.value)}}>
                                {multiple && <input type="checkbox"/>}
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
};

export default Select;