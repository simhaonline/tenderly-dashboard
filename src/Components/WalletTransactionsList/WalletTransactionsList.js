import React from 'react';
import PropTypes from 'prop-types';

import {Transaction} from "../../Core/models";

const WalletTransactionsList = ({transactions}) => {
    return (
        <div>
            table
        </div>
    );
};

WalletTransactionsList.propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.instanceOf(Transaction)).isRequired,
};

export default WalletTransactionsList;
