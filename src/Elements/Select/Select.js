import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import classNames from 'classnames';

import './Select.scss';

class Select extends Component {
    handleSelectChange = (value) => {
        const {onChange, field} = this.props;

        onChange(value, field);
    };

    render() {
        const {options, value, multiple, selectLabel, isClearable, className, components} = this.props;

        return (
            <div className={classNames(
                "Select",
                className,
            )}>
                <ReactSelect value={value} components={components}
                             isClearable={isClearable}
                             placeholder={selectLabel} classNamePrefix="Select" isMulti={multiple} onChange={this.handleSelectChange} options={options}/>
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
    isClearable: PropTypes.bool,
    onChange: PropTypes.func,
};

Select.defaultProps = {
    value: '',
    multiple: false,
    onChange: () => {},
    components: {},
    isClearable: false,
    selectLabel: 'Select option',
};

export default Select;
