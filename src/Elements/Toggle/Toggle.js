import React from 'react';
import classNames from 'classnames';

import './Toggle.scss';

const Toggle = ({value, onChange, className}) => {
    return (
        <div className={classNames(
            "Toggle",
            className,
            {
                "Active": value,
            },
        )} onClick={event => onChange(event)}>
            <div className="ToggleSwitch"/>
        </div>
    )
};

Toggle.defaultProps = {
    value: false,
    onChange: () => {},
};

export default Toggle;
