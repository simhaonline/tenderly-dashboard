import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './TransactionsList.scss';

class TransactionsList extends Component {
    render() {
        return (
            <div className="TransactionsList">

            </div>
        );
    }
}

TransactionsList.propTypes = {
    transactions: PropTypes.array,
};

export default TransactionsList;
