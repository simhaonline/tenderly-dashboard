import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from "@sentry/browser";

import {Tooltip} from "../../Elements";

import './TransactionContractsColumn.scss';
import Blockies from "react-blockies";

const TransactionContractsColumn = ({transaction, contracts}) => {
    const id = `TxContractsTooltip__${transaction.txHash}`;

    const txContracts = Array.from(new Set(transaction.contracts))
        .map(contractAddress => contracts.find(contract => contract.address === contractAddress))
        .filter(contract => !!contract);

    if (!txContracts || txContracts.length === 0) {
        // @TODO Remove this when we have fixed this bug when a tx doesn't have a contract
        Sentry.withScope(scope => {
            scope.setTag("transaction-hash", transaction.txHash);
            scope.setTag("transaction-contracts", transaction.contracts);
            scope.setLevel(Sentry.Severity.Warning);
            Sentry.captureMessage('Transactions list item without contract');
        });

        return <div className="TransactionContractsColumn">
            <span className="MonospaceFont LinkText">-</span>
        </div>;
    }

    return (
        <div className="TransactionContractsColumn">
            <div className="TransactionContractsColumn__Contract" id={id}>
                <Blockies
                    seed={txContracts[0].id}
                    size={8}
                    scale={2}
                    className="BorderRadius1 MarginRight1"
                />
                {txContracts[0].name} {txContracts.length > 1 && <span>(+{txContracts.length - 1})</span>}
            </div>
            {txContracts.length > 1 && <Tooltip id={id} className="TransactionContractsColumn__Tooltip">
                {txContracts.map(contract => <div key={contract.address} className="TransactionContractsColumn__Tooltip__Contract">
                    <Blockies
                        seed={contract.id}
                        size={8}
                        scale={2}
                        className="BorderRadius1 MarginRight1"
                    />
                    <span className="SemiBoldText MarginRight1">{contract.name}</span>
                    <span className="MutedText">({contract.address})</span>
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
