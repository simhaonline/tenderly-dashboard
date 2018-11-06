import React from 'react';
import {Link} from "react-router-dom";
import classNames from 'classnames';

import './Button.css';

function getButtonColorClass(color) {
    switch (color) {
        case 'secondary':
            return 'Secondary';
        case 'danger':
            return 'Danger';
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
        default:
            return '';
    }
}

const Button = ({children, type, color, size, className, outline, stretch, to, ...props}) => {
    let ButtonTag = 'button';

    if (to) {
        ButtonTag = Link;
    }

    const buttonColorClass = getButtonColorClass(color);
    const buttonSizeClass = getButtonSizeClass(size);

    return (
        <ButtonTag className={classNames(
            outline ? 'ButtonOutlined' : 'Button',
            stretch ? 'Stretch' : '',
            className,
            buttonColorClass,
            buttonSizeClass,
        )} type={type || 'button'} to={to} {...props}>
            {children}
        </ButtonTag>
    )
};

export default Button;
