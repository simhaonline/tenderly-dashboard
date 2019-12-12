import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

import {TransactionsListColumnTypes} from "../../Common/constants";

import {Project} from "../../Core/models";

import {Table} from "../../Elements";
import {TransactionHashColumn, TransactionStatusColumn, TransactionMoreColumn, TransactionContractsColumn, TimeAgoColumn} from "../index";

const transactionTableConf = [
    {
        label: "Tx Hash",
        inclusionKey: TransactionsListColumnTypes.TX_HASH,
        size: 200,
        renderColumn: (tx, metadata) => <TransactionHashColumn transaction={tx} contracts={metadata.contracts} displayType/>,
    },
    {
        label: 'Status',
        inclusionKey: TransactionsListColumnTypes.STATUS,
        size: 120,
        renderColumn: tx => <TransactionStatusColumn status={tx.status}/>,
    },
    {
        label: 'Contracts',
        inclusionKey: TransactionsListColumnTypes.CONTRACTS,
        className: "HideMobile",
        renderColumn: (tx, metadata) => <TransactionContractsColumn transaction={tx} contracts={metadata.contracts}/>,
    },
    {
        label: 'Function',
        inclusionKey: TransactionsListColumnTypes.METHOD,
        size: 200,
        renderColumn: tx => <span className="MonospaceFont LinkText">{tx.method ? `${tx.method}` : '-'}</span>,
    },
    {
        label: "When",
        inclusionKey: TransactionsListColumnTypes.TIMESTAMP,
        className: "HideMobile",
        size: 160,
        renderColumn: tx => <TimeAgoColumn timestamp={tx.timestamp}/>,
    },
    {
        className: "TransactionMoreColumn HideMobile",
        renderColumn: (tx, metadata) => <TransactionMoreColumn transaction={tx} project={metadata.project}/>,
    },
];

class TransactionsList extends Component {
    /**
     * @param {Transaction} transaction
     */
    handleRowClick = (transaction) => {
        const {history, project, location: {search}} = this.props;

        let transactionRoute;

        const networkRoute = getRouteSlugForNetwork(transaction.network);

        if (project) {
            transactionRoute = `/${project.owner}/${project.slug}/tx/${networkRoute}/${transaction.txHash}`;
        } else {
            transactionRoute = `/tx/${networkRoute}/${transaction.txHash}`;
        }

        history.push({
            pathname: transactionRoute,
            state: {
                previousPageQuery: search,
            },
        });
    };

    render() {
        const {transactions, contracts, currentPage, perPage, onPageChange, onPerPageChange, loading, project} = this.props;

        return (
            <Table data={transactions} keyAccessor="txHash" configuration={transactionTableConf} metadata={{
                contracts,
                project,
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
    loading: PropTypes.bool,
    project: PropTypes.instanceOf(Project),
};

TransactionsList.defaultProps = {
    publicContracts: false,
    onPageChange: () => {},
    onPerPageChange: () => {},
};

export default withRouter(TransactionsList);
