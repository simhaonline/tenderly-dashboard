import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './TransactionFilters.scss';

class TransactionFilters extends Component {
    render() {
        return (
            <div className="TransactionFilters">

            </div>
        );
    }
}

TransactionFilters.propTypes = {
    lastSync: PropTypes.number,
    filters: PropTypes.array,
    onFilter: PropTypes.func,
};

export default TransactionFilters;
