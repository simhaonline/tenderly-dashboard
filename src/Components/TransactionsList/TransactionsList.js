import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

import {DEFAULT_TRANSACTIONS_LIST_COLUMNS, TransactionsListColumnTypes} from "../../Common/constants";

import {Project} from "../../Core/models";

import {Table} from "../../Elements";
import {
    TransactionHashColumn,
    TransactionStatusColumn,
    TransactionMoreColumn,
    TransactionContractsColumn,
    TimeAgoColumn,
    NetworkColumn, PrettyAddressColumn
} from "../index";
import TransactionLatestTagColumn from "../TransactionLatestTagColumn/TransactionLatestTagColumn";

const transactionTableConf = [
    {
        label: "Tx Hash",
        inclusionKey: TransactionsListColumnTypes.TX_HASH,
        size: 220,
        renderColumn: (tx, metadata) => <TransactionHashColumn transaction={tx} contracts={metadata.contracts} displayType/>,
    },
    {
        label: 'Status',
        inclusionKey: TransactionsListColumnTypes.STATUS,
        size: 120,
        renderColumn: tx => <TransactionStatusColumn status={tx.status}/>,
    },
    {
        label: 'From',
        inclusionKey: TransactionsListColumnTypes.FROM,
        size: 200,
        renderColumn: (tx, metadata) => <PrettyAddressColumn address={tx.from} network={tx.network} contracts={metadata.contracts} leftOffset={10}/>,
    },
    {
        label: 'To',
        inclusionKey: TransactionsListColumnTypes.TO,
        size: 200,
        renderColumn: (tx, metadata) => <PrettyAddressColumn address={tx.to} network={tx.network} contracts={metadata.contracts} leftOffset={10}/>,
    },
    {
        label: 'Function',
        inclusionKey: TransactionsListColumnTypes.METHOD,
        size: 220,
        renderColumn: tx => <span className="MonospaceFont">{tx.method ? `${tx.method}` : '-'}</span>,
    },
    {
        label: 'Contracts',
        inclusionKey: TransactionsListColumnTypes.CONTRACTS,
        className: "HideMobile",
        renderColumn: (tx, metadata) => <TransactionContractsColumn transaction={tx} contracts={metadata.contracts}/>,
    },
    {
        label: "Tags",
        inclusionKey: TransactionsListColumnTypes.TAGS,
        size: 120,
        renderColumn: (tx, metadata) => <TransactionLatestTagColumn transaction={tx} revisions={metadata.contractRevisions}/>,

    },
    {
        label: 'Network',
        inclusionKey: TransactionsListColumnTypes.NETWORK,
        size: 160,
        renderColumn: tx => <NetworkColumn network={tx.network}/>,
    },
    {
        label: 'Gas Used',
        inclusionKey: TransactionsListColumnTypes.GAS_USED,
        size: 120,
        renderColumn: tx => <div className="TextAlignRight">{tx.gasUsed.toLocaleString()}</div>,
    },
    {
        label: 'Block',
        inclusionKey: TransactionsListColumnTypes.BLOCK,
        size: 120,
        renderColumn: tx => <div className="MonospaceFont LinkText">{tx.block}</div>,
    },
    {
        label: "When",
        inclusionKey: TransactionsListColumnTypes.TIMESTAMP,
        className: "HideMobile",
        size: 160,
        renderColumn: tx => <TimeAgoColumn timestamp={tx.timestamp}/>,
    },
    {
        className: "TransactionMoreColumn HideMobile MarginLeftAuto",
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
        const {transactions, contracts, currentPage, perPage, onPageChange, onPerPageChange, loading, activeColumns, project, contractRevisions} = this.props;

        return (
            <Table data={transactions} keyAccessor="txHash" configuration={transactionTableConf.filter(conf => activeColumns.includes(conf.inclusionKey) || !conf.inclusionKey)} metadata={{
                contracts,
                contractRevisions,
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
    activeColumns: DEFAULT_TRANSACTIONS_LIST_COLUMNS,
    onPageChange: () => {},
    onPerPageChange: () => {},
};

export default withRouter(TransactionsList);
