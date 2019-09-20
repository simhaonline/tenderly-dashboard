import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

function getButtonColorClass(color) {
    switch (color) {
        case 'secondary':
            return 'Secondary';
        case 'danger':
            return 'Danger';
        case 'success':
            return 'Success';
        default:
            return 'Primary';
    }
}

function getButtonSizeClass(size) {
    switch (size) {
        case 'large':
            return 'Large';
        case 'small':
            return 'Small';
        case 'extra-small':
            return 'ExtraSmall';
        default:
            return '';
    }
}

export const ButtonGroup = ({children}) => {
    return (
        <div className="ButtonGroup">
            {children}
        </div>
    )
};

const Button = ({children, width, type, color, size, readOnly, href, className, disabled, outline, stretch, to, ...props}) => {
    let ButtonTag = 'button';

    if (to) {
        ButtonTag = Link;
    } else if (href) {
        ButtonTag = 'a';
    }

    const buttonColorClass = getButtonColorClass(color);
    const buttonSizeClass = getButtonSizeClass(size);

    return (
        <ButtonTag className={classNames(
            "Button",
            outline ? 'Button--Outlined' : 'Button--Regular',
            className,
            buttonColorClass,
            buttonSizeClass,
            {
                "Stretch": stretch,
                "ReadOnly": readOnly,
                "Disabled": disabled,
            },
        )} type={type || 'button'} to={to} href={href} disabled={disabled} {...props} style={{
            width: `${width}px`,
        }}>
            {children}
        </ButtonTag>
    )
};

Button.propTypes = {
    onClick: PropTypes.func,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object,]),
    color: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
};

export default Button;
