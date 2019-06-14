import React from 'react';

import {Icon} from "../../Elements";

import './Loaders.scss';

export const CircularLoader = () => {
    return (
        <div className="CircularLoader">
            <div className="LoadingSpinner"/>
        </div>
    )
};

export const DotLoader = () => {
    return (
        <div className="DotLoader">
            <div className="DotContainer">
                <div className="Dot"/>
                <div className="Dot"/>
                <div className="Dot"/>
            </div>
            <div className="DotContainer">
                <div className="Dot"/>
                <div className="Dot"/>
                <div className="Dot"/>
            </div>
            <div className="DotContainer">
                <div className="Dot"/>
                <div className="Dot"/>
                <div className="Dot"/>
            </div>
        </div>

    )
};

export const EthereumLoader = () => {
    return (
        <div className="EthereumLoader">
            <Icon icon="ethereum" className="EthereumIcon"/>
            <div className="Spinner"/>
        </div>
    )
};

export const SimpleLoader = () => (
    <div className="SimpleLoader">
        <div/>
        <div/>
    </div>
);
