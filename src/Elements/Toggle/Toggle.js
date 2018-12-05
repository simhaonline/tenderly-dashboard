import React from 'react';
import classNames from 'classnames';

import './Toggle.css';

const Toggle = ({value, onChange}) => {
    return (
        <div className={classNames(
            "Toggle",
            {
                "Active": value,
            }
        )}>
            <div className="ToggleSwitch"/>
        </div>
    )
};

Toggle.defaultProps = {
    value: false,
    onChange: () => {},
};

export default Toggle;
