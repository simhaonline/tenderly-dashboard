import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TransactionStatusTag.scss';

const TransactionStatusTag = ({status, type}) => {
    return (
        <div className={classNames(
            "TransactionStatusTag",
            {
                Success: status,
                Failed: !status,
            },
        )}>
            {status ? 'Success' : 'Failed'}
        </div>
    );
};

TransactionStatusTag.propTypes = {
    status: PropTypes.bool.isRequired,
    type: PropTypes.string,
};

TransactionStatusTag.defaultProps = {
    type: 'incoming',
};

export default TransactionStatusTag;
