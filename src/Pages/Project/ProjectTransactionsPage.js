import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from "moment";
import _ from 'lodash';

import {areProjectContractsLoaded, getProject} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";
import {ONE_MIN_INTERVAL, ProjectTypes} from "../../Common/constants";
import Notifications from "../../Utils/Notifications";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Container, Page, PageHeading, Toggle} from "../../Elements";
import {ProjectContentLoader, TransactionsList, TransactionFilters, ProjectSetupEmptyState} from "../../Components";

class ProjectTransactionsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            lastFetch: null,
            page: props.page,
            perPage: 20,
            projectSetup: false,
            transactions: [],
            filters: {},
        };
    }

    async componentDidMount() {
        const {project, txActions, contractActions, contractsLoaded} = this.props;
        const {filters, page, perPage} = this.state;

        let transactions = [];

        if (project.type !== ProjectTypes.DEMO) {
            const actionResponse = await txActions.fetchTransactionsForProject(project.id, filters, page, perPage);

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

            this.startPolling();
        } else {
            const exampleResponse = await txActions.fetchExampleTransactions();

            transactions = exampleResponse.data;
        }

        this.setState({
            loading: false,
            transactions,
            lastFetch: moment.now(),
        });
    }

    startPolling = () => {
        const refreshSubscriber = setInterval(() => {
            this.fetchTransactions();
            Notifications.info("Transactions list updated.", null, {
                toastId: "transactions-updated",
            });
        }, ONE_MIN_INTERVAL);

        this.setState({
            refreshSubscriber,
        });
    };

    stopPolling = () => {
        const {refreshSubscriber} = this.state;

        if (refreshSubscriber) {
            clearInterval(refreshSubscriber);
        }

        this.setState({
            refreshSubscriber: null,
        });
    };

    componentWillUnmount() {
        const {refreshSubscriber} = this.state;

        if (refreshSubscriber) {
            clearInterval(refreshSubscriber);
        }
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
        const {filters, page, perPage} = this.state;

        const actionResponse = await txActions.fetchTransactionsForProject(project.id, filters, page, perPage);

        if (!actionResponse.success) {
            return;
        }

        this.setState({
            transactions: actionResponse.data,
            lastFetch: moment.now(),
        });
    }, 500);

    handlePageChange = (nextPage) => {
        this.setState({
            page: nextPage,
        }, () => {
            this.fetchTransactions();
        });
    };

    handlePerPageChange = (perPage) => {
        this.setState({
            perPage,
        }, () => {
            this.fetchTransactions();
        });
    };

    handleRefreshToggle = () => {
        const {refreshSubscriber} = this.state;

        const isPolling = !!refreshSubscriber;

        if (isPolling) {
            this.stopPolling();
        } else {
            this.startPolling();
        }
    };

    render() {
        const {loading, transactions, lastFetch, filters, page, perPage, refreshSubscriber} = this.state;
        const {contracts, project} = this.props;

        const projectIsSetup = !!project.lastPushAt;
        const isPolling = !!refreshSubscriber || loading;

        const activeFilters = Object.values(filters).filter(filter => filter.value.length);

        return (
            <Page id="ProjectTransactionsPage">
                <Container>
                    <PageHeading>
                        <h1>Transactions</h1>
                        {projectIsSetup && <div className="RightContent">
                            <div className="DisplayFlex AlignItemsCenter">
                                <span className="MarginRight2">Auto Refresh: {isPolling ? 'On' : 'Off'}</span>
                                <Toggle value={isPolling} onChange={this.handleRefreshToggle}/>
                            </div>
                        </div>}
                    </PageHeading>
                    {loading && <ProjectContentLoader text="Fetching project transactions..."/>}
                    {!loading && !projectIsSetup && <ProjectSetupEmptyState project={project} onSetup={this.fetchTransactions}/>}
                    {!loading && projectIsSetup && <Fragment>
                        {!!transactions.length && <TransactionFilters lastSync={lastFetch} activeFilters={activeFilters} contracts={contracts} onFiltersChange={this.handleFilterChange}/>}
                        <TransactionsList transactions={transactions} contracts={contracts}
                                          currentPage={page} onPageChange={this.handlePageChange}
                                          perPage={perPage} onPerPageChange={this.handlePerPageChange}/>
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
