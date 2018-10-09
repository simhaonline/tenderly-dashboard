import React from 'react';
import {Link} from "react-router-dom";
import classNames from 'classnames';

import {NetworkRouteTypes} from "../../Common/constants";

import './PublicContractsSwitcher.css';

const PublicContractsSwitcher = ({active}) => {
    const networks = [
        {
            route: NetworkRouteTypes.MAIN,
            label: 'Main Network',
            soon: true,
        },
        {
            route: NetworkRouteTypes.KOVAN,
            label: 'Kovan Testnet',
            soon: false,
        },
    ];

    return (
        <div className="PublicContractsSwitcher">
            {networks.map(network =>
                <Link to={`/public-contracts/${network.route}`} onClick={event => {
                    if (network.soon) {
                        event.preventDefault();
                    }
                }} key={network.route} title={network.soon ? 'Coming soon..' : ''} className={classNames(
                    'SwitcherItem',
                    {
                        'active': active === network.route,
                        'disabled': network.soon,
                    }
                )}>
                    <div className="Label">{network.label}</div>
                </Link>
            )}
        </div>
    );
};

export default PublicContractsSwitcher;
