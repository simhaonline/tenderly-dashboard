import React from 'react';
import {Link} from "react-router-dom";
import classNames from 'classnames';

import './Button.css';

const Button = ({children, type, className, to, ...props}) => {
    let ButtonTag = 'button';

    if (to) {
        ButtonTag = Link;
    }

    return (
        <ButtonTag className={classNames(
            'Button',
            className,
        )} type={type || 'button'} to={to} {...props}>
            {children}
        </ButtonTag>
    )
};

export default Button;
