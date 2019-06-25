import React from 'react';
import classNames from 'classnames';

import './Loaders.scss';

export const CircularLoader = () => {
    return (
        <div className="CircularLoader">
            <div className="LoadingSpinner"/>
        </div>
    )
};

export const SimpleLoader = ({inverse = false}) => (
    <div className="SimpleLoader">
        <div className={classNames(
            "SimpleLoader__Circle",
            {
                "SimpleLoader__Circle--Inverse": inverse,
            }
        )}/>
        <div className={classNames(
            "SimpleLoader__Circle",
            {
                "SimpleLoader__Circle--Inverse": inverse,
            }
        )}/>
    </div>
);
