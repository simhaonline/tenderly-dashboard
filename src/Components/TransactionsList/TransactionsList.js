import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {NetworkAppToRouteTypeMap} from "../../Common/constants";

import {Table} from "../../Elements";
import {TransactionHashColumn, NetworkColumn, TransactionStatusColumn, TransactionMoreColumn, TransactionContractsColumn, TimeAgoColumn} from "../index";

const transactionTableConf = [
    {
        label: "Tx Hash",
        renderColumn: (tx, metadata) => <TransactionHashColumn transaction={tx} contracts={metadata.contracts} displayType/>,
    },
    {
        label: 'Status',
        size: 120,
        renderColumn: tx => <TransactionStatusColumn status={tx.status}/>,
    },
    {
        label: 'Contracts',
        className: "HideMobile",
        renderColumn: (tx, metadata) => <TransactionContractsColumn transaction={tx} contracts={metadata.contracts}/>,
    },
    {
        label: "Network",
        size: 140,
        renderColumn: tx => <NetworkColumn network={tx.network}/>,
    },
    {
        label: "When",
        className: "HideMobile",
        size: 160,
        renderColumn: tx => <TimeAgoColumn timestamp={tx.timestamp}/>,
    },
    {
        className: "TransactionMoreColumn HideMobile",
        renderColumn: tx => <TransactionMoreColumn transaction={tx}/>,
    },
];

class TransactionsList extends Component {
    handleRowClick = (transaction) => {
        const {history, isPublicContracts, location: {search}} = this.props;

        let transactionRoute;

        const networkRoute = NetworkAppToRouteTypeMap[transaction.network];

        if (isPublicContracts) {
            transactionRoute = `/tx/${networkRoute}/${transaction.txHash}`;
        } else {
            transactionRoute = `/project/${transaction.projectId}/tx/${networkRoute}/${transaction.txHash}`;
        }

        history.push({
            pathname: transactionRoute,
            state: {
                previousPageQuery: search,
            },
        });
    };

    render() {
        const {transactions, contracts, currentPage, perPage, onPageChange, onPerPageChange, loading} = this.props;

        return (
            <Table data={transactions} keyAccessor="txHash" configuration={transactionTableConf} metadata={{
                contracts,
            }} onRowClick={this.handleRowClick} minWidth={970} loading={loading} emptyStateLabel="No transactions scanned yet"
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
    loading: PropTypes.bool,
};

TransactionsList.defaultProps = {
    publicContracts: false,
    onPageChange: () => {},
    onPerPageChange: () => {},
};

export default withRouter(TransactionsList);
