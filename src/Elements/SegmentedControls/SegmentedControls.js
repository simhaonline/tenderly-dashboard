import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SegmentedControls = ({value, options, onChange}) => {
    const onOptionClick = (option) => (() => {
        if (option.value !== value) {
            onChange(option.value);
        }
    });

    return (
        <div className="SegmentedControls">
            {options.map(option => <div className={classNames(
                "ControlOption",
                {
                    "Active": option.value === value,
                }
            )} key={option.value} onClick={onOptionClick(option)}>
                {option.label}
            </div>)}
        </div>
    )
};

SegmentedControls.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SegmentedControls.defaultProps = {
    onChange: () => {},
};

export default SegmentedControls;
