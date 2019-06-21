import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {generateShortAddress} from "../../Utils/AddressFormatter";

import {Icon, Tooltip} from "../../Elements";

import './TransactionHashColumn.scss';

const TransactionHashColumn = ({transaction, displayType, contracts}) => {
    const id = `InternalTxTooltip__${transaction.txHash}`;

    return (
        <div className="TransactionHashColumn DisplayFlex AlignItemsCenter">
            <span className="TransactionHashColumn__Address">{generateShortAddress(transaction.txHash, 12, 6)}</span>
            {displayType && transaction.isInternalTransaction(contracts) && <Fragment>
                <div className="TransactionHashColumn__TypeWrapper MarginLeft2" id={id}>
                    <Icon icon="minimize-2"/>
                </div>
                <Tooltip id={id}>
                    <span>Internal Transaction</span>
                </Tooltip>
            </Fragment>}
        </div>
    )
};

TransactionHashColumn.propTypes = {
    transaction: PropTypes.object.isRequired,
    contracts: PropTypes.array.isRequired,
    displayType: PropTypes.bool,
};

TransactionHashColumn.defaultProps = {
    displayType: false,
};

export default TransactionHashColumn;
