import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './SegmentedControls.scss';

const SegmentedControls = ({value, options, onChange, size, className}) => {
    const onOptionClick = (option) => (() => {
        if (option.value !== value) {
            onChange(option.value);
        }
    });

    return (
        <div className={classNames(
            "SegmentedControls",
            className,
        )}>
            {options.map(option => <div className={classNames(
                "SegmentedControls__ControlOption",
                {
                    "SegmentedControls__ControlOption--Small": size === 'small',
                    "SegmentedControls__ControlOption--Active": option.value === value,
                }
            )} key={option.value} onClick={onOptionClick(option)}>
                {option.label}
            </div>)}
        </div>
    )
};

SegmentedControls.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    size: PropTypes.string,
};

SegmentedControls.defaultProps = {
    onChange: () => {},
};

export default SegmentedControls;
