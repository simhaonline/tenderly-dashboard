import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {TransactionHashColumn, NetworkColumn, TransactionStatusColumn} from "../index";
import {Table} from "../../Elements";
import {NetworkAppToRouteTypeMap} from "../../Common/constants";

const transactionTableConf = [
    {
        label: "Tx Hash",
        renderColumn: tx => <TransactionHashColumn transaction={tx}/>,
    },
    {
        status: 'Status',
        renderColumn: tx => <TransactionStatusColumn status={tx.status}/>,
    },
    {
        label: "Network",
        renderColumn: tx => <NetworkColumn network={tx.network}/>,
    },
];

class TransactionsList extends Component {
    handleRowClick = (transaction) => {
        const {history, isPublicContracts} = this.props;

        let transactionRoute;

        const networkRoute = NetworkAppToRouteTypeMap[transaction.network];

        if (isPublicContracts) {
            transactionRoute = `/tx/${networkRoute}/${transaction.txHash}`;
        } else {
            transactionRoute = `/project/${transaction.projectId}/tx/${networkRoute}/${transaction.txHash}`;
        }

        history.push(transactionRoute);
    };

    render() {
        const {transactions, contracts, currentPage, perPage, onPageChange, onPerPageChange} = this.props;
        return (
            <Table data={transactions} keyAccessor="txHash" configuration={transactionTableConf} metadata={{
                contracts,
            }} onRowClick={this.handleRowClick}
                   currentPage={currentPage} onPageChange={onPageChange}
                   perPage={perPage} onPerPageChange={onPerPageChange}/>
        );
    }
}

TransactionsList.propTypes = {
    transactions: PropTypes.array.isRequired,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func,
    perPage: PropTypes.number,
    onPerPageChange: PropTypes.func,
    isPublicContracts: PropTypes.bool,
};

TransactionsList.defaultProps = {
    publicContracts: false,
    onPageChange: () => {},
    onPerPageChange: () => {},
};

export default withRouter(TransactionsList);
