import React from 'react';
import PropTypes from 'prop-types';

import {Tooltip} from "../../Elements";

import './TransactionContractsColumn.scss';

const TransactionContractsColumn = ({transaction, contracts}) => {
    const id = `TxContractsTooltip__${transaction.txHash}`;

    const txContracts = Array.from(new Set(transaction.contracts))
        .map(contractAddress => contracts.find(contract => contract.address === contractAddress))
        .filter(contract => !!contract);

    if (!txContracts || txContracts.length === 0) {
        return <div className="TransactionContractsColumn">
            <span className="MonospaceFont LinkText">-</span>
        </div>;
    }

    return (
        <div className="TransactionContractsColumn">
            <div className="TransactionContractsColumn__Contract" id={id}>
                {txContracts[0].name} {txContracts.length > 1 && <span>(+{txContracts.length - 1})</span>}
            </div>
            {txContracts.length > 1 && <Tooltip id={id} className="TransactionContractsColumn__Tooltip">
                {txContracts.map(contract => <div key={contract.address} className="TransactionContractsColumn__Tooltip__Contract">
                    <span className="SemiBoldText">{contract.name}</span> <span className="MutedText">({contract.address})</span>
                </div>)}
            </Tooltip>}
        </div>
    )
};

TransactionContractsColumn.propTypes = {
    transaction: PropTypes.object.isRequired,
    contracts: PropTypes.array.isRequired,
};

export default TransactionContractsColumn;
