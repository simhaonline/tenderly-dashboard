import React from 'react';

import './Loaders.css';

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
