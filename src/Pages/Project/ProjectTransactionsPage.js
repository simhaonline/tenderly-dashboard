import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from "moment";
import _ from 'lodash';

import {areProjectContractsLoaded, getProject} from "../../Common/Selectors/ProjectSelectors";
import {ProjectTypes} from "../../Common/constants";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Container, Page} from "../../Elements";
import {ProjectContentLoader, TransactionsList, TransactionFilters} from "../../Components";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

class ProjectTransactionsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            lastFetch: null,
            page: props.page,
            projectSetup: false,
            transactions: [],
            filters: {},
        };
    }

    async componentDidMount() {
        const {project, txActions, contractActions, contractsLoaded} = this.props;
        const {filters, page} = this.state;

        let transactions = [];

        if (project.type !== ProjectTypes.DEMO) {
            const actionResponse = await txActions.fetchTransactionsForProject(project.id, filters, page);

            if (!actionResponse.success) {
                this.setState({
                    loading: false,
                    error: true,
                    lastFetch: moment.now(),
                });

                return;
            }

            transactions = actionResponse.data;

            if (!contractsLoaded) {
                await contractActions.fetchContractsForProject(project.id);
            }
        } else {
            // @TODO Logic for getting demo transactions
            // transactions = getDemoTransactions();
        }

        this.setState({
            loading: false,
            transactions,
            lastFetch: moment.now(),
        });
    }

    handleFilterChange = (filter) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [filter.type]: filter,
            }
        });

        this.fetchTransactions();
    };

    fetchTransactions = _.debounce(async () => {
        const {project, txActions} = this.props;
        const {filters, page} = this.state;

        const actionResponse = await txActions.fetchTransactionsForProject(project.id, filters, page);

        if (!actionResponse.success) {
            return;
        }

        this.setState({
            transactions: actionResponse.data,
            lastFetch: moment.now(),
        });
    }, 500);

    handlePageChange = () => {

    };

    render() {
        const {loading, transactions, lastFetch, filters, page} = this.state;
        const {contracts} = this.props;

        const activeFilters = Object.values(filters).filter(filter => filter.value.length);

        return (
            <Page id="ProjectTransactionsPage">
                <Container>
                    {loading && <ProjectContentLoader text="Fetching project transactions..."/>}
                    {!loading && <Fragment>
                        <TransactionFilters lastSync={lastFetch} activeFilters={activeFilters} contracts={contracts} onFiltersChange={this.handleFilterChange}/>
                        <TransactionsList transactions={transactions} contracts={contracts} currentPage={page} onPageChange={this.handlePageChange}/>
                    </Fragment>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}, location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const queryPage = parseInt(searchParams.get('page')) || 1;

    return {
        project: getProject(state, id),
        page: queryPage,
        contracts: getContractsForProject(state, id),
        contractsLoaded: areProjectContractsLoaded(state, id),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        txActions: bindActionCreators(transactionActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectTransactionsPage);
