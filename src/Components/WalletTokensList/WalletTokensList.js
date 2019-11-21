import React from 'react';
import PropTypes from 'prop-types';

import {Wallet} from "../../Core/models";

const WalletTokensList = ({wallet}) => {
    return (
        <div>

        </div>
    );
};

WalletTokensList.propTypes = {
    wallet: PropTypes.instanceOf(Wallet).isRequired,
};

export default WalletTokensList;
