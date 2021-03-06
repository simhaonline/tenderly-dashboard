import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from "moment";
import _ from 'lodash';

import Notifications from "../../Utils/Notifications";

import {FIVE_SECOND_INTERVAL, ONE_MIN_INTERVAL, ProjectTypes, TransactionFilterTypes} from "../../Common/constants";

import {
    areProjectContractsLoaded,
    getProjectBySlugAndUsername, getProjectContractRevisions,
    getProjectTags
} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";
import {getAccountPlanForProject} from "../../Common/Selectors/BillingSelectors";

import {contractActions, projectActions, transactionActions} from "../../Core/actions";

import {Container, Page, PageHeading, Toggle} from "../../Elements";
import {ProjectContentLoader, TransactionsList, BackfillingProgress, TransactionFilters, ProjectSetupEmptyState, NoTransactionsEmptyState} from "../../Components";

const DEFAULT_TX_PER_PAGE = 20;

class ProjectTransactionsPage extends Component {
    constructor(props) {
        super(props);

        const {queryPage, queryPerPage, queryFilters} = props;

        this.state = {
            loading: true,
            lastFetch: null,
            page: queryPage,
            perPage: queryPerPage,
            projectSetup: false,
            transactions: [],
            filters: queryFilters,
            activeColumns: [],
        };
    }

    async componentDidMount() {
        const {project, projectActions, txActions, contractActions, contractsLoaded} = this.props;
        const {filters, page, perPage} = this.state;

        let transactions = [];

        if (project.type !== ProjectTypes.DEMO) {
            if (!contractsLoaded) {
                await contractActions.fetchContractsForProject(project);
            }

            const actionResponse = await txActions.fetchTransactionsForProject(project.slug, project.owner, filters, page, perPage);

            if (!actionResponse.success) {
                this.setState({
                    loading: false,
                    error: actionResponse.data,
                    lastFetch: moment.now(),
                });

                return;
            }

            transactions = actionResponse.data;

            this.startPolling();
        } else {
            const exampleResponse = await txActions.fetchExampleTransactions();

            transactions = exampleResponse.data;
        }

        const activeColumnsResponse = txActions.getTransactionsListColumns();

        this.setState({
            loading: false,
            transactions,
            activeColumns: activeColumnsResponse.data,
            lastFetch: moment.now(),
        });

        if (project.type !== ProjectTypes.DEMO)  {
            const backfillingResponse = await projectActions.getProjectBackFillingStatus(project);

            if (backfillingResponse.success) {
                if (backfillingResponse.data.step !== 3) {
                    this.startBackfillingPolling();
                }

                this.setState({
                    backfillingStatus: backfillingResponse.data,
                });
            }
        }
    }

    startPolling = () => {
        const refreshSubscriber = setInterval(() => {
            if (this.state.fetching) return;

            this.fetchTransactions();
            Notifications.info({title: "Transactions list updated."}, {
                toastId: "transactions-updated",
            });
        }, ONE_MIN_INTERVAL);

        this.setState({
            refreshSubscriber,
        });
    };

    startBackfillingPolling = () => {
        const {project, projectActions} = this.props;

        const backfillingSubscriber = setInterval(async () => {
            const backfillingResponse = await projectActions.getProjectBackFillingStatus(project);

            if (backfillingResponse.success) {
                if (backfillingResponse.data.step === 3) {
                    this.stopBackfillingPolling();
                }

                this.setState({
                    backfillingStatus: backfillingResponse.data,
                });
            } else {
                this.setState({
                    backfillingStatus: null,
                });
            }
        }, FIVE_SECOND_INTERVAL);

        this.setState({
            backfillingSubscriber,
        });
    };

    stopBackfillingPolling = () => {
        const {backfillingSubscriber} = this.state;

        if (backfillingSubscriber) {
            clearInterval(backfillingSubscriber);
        }

        this.setState({
            backfillingSubscriber: null,
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
        const {refreshSubscriber, backfillingSubscriber} = this.state;

        if (refreshSubscriber) {
            clearInterval(refreshSubscriber);
        }

        if (backfillingSubscriber) {
            clearInterval(backfillingSubscriber);
        }
    }

    handleFilterChange = (filters) => {
        let newFilters = {};

        if (filters) {
            filters.forEach(filter => {
                newFilters[filter.type] = filter;
            });
        }

        this.setState({
            fetching: true,
            filters: newFilters,
            page: 1,
        });

        this.fetchTransactions();
    };

    updateUrlQuery = () => {
        const {history} = this.props;
        const {filters, page, perPage} = this.state;

        const queryData = new URLSearchParams();

        if (page !== 1) {
            queryData.append('page' ,page);
        }

        if (perPage !== DEFAULT_TX_PER_PAGE) {
            queryData.append('perPage', perPage);
        }

        if (filters[TransactionFilterTypes.STATUS] && filters[TransactionFilterTypes.STATUS].value !== "all") {
            queryData.append('status', filters[TransactionFilterTypes.STATUS].value);
        }

        if (filters[TransactionFilterTypes.TYPE] && filters[TransactionFilterTypes.TYPE].value !== "all") {
            queryData.append('type', filters[TransactionFilterTypes.TYPE].value);
        }

        if (filters[TransactionFilterTypes.NETWORKS] && filters[TransactionFilterTypes.NETWORKS].value) {
            queryData.append('network', filters[TransactionFilterTypes.NETWORKS].value);
        }

        if (filters[TransactionFilterTypes.CONTRACTS] && filters[TransactionFilterTypes.CONTRACTS].value && filters[TransactionFilterTypes.CONTRACTS].value.length) {
            filters[TransactionFilterTypes.CONTRACTS].value.forEach(value => {
                queryData.append('contracts', value);
            });
        }

        history.push(`?${queryData.toString()}`);
    };

    fetchTransactions = _.debounce(async () => {
        const {project, txActions} = this.props;
        const {filters, page, perPage} = this.state;

        let actionResponse;

        this.updateUrlQuery();

        if (project.type === ProjectTypes.DEMO) {
            actionResponse= await txActions.fetchExampleTransactions();
        } else {
            actionResponse = await txActions.fetchTransactionsForProject(project.slug, project.owner, filters, page, perPage);
        }

        if (!actionResponse.success) {
            this.setState({
                fetching: false,
            });
            return;
        }

        this.setState({
            transactions: actionResponse.data,
            fetching: false,
            lastFetch: moment.now(),
        });
    }, 500);

    handlePageChange = (nextPage) => {
        this.setState({
            page: nextPage,
        }, () => {
            this.setState({
                fetching: true,
            });

            this.fetchTransactions();
        });
    };

    handlePerPageChange = (perPage) => {
        this.setState({
            perPage,
        }, () => {
            this.setState({
                fetching: true,
            });

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

    handleColumnToggle = (column) => {
        const {txActions} = this.props;

        const toggleColumnsResponse = txActions.toggleTransactionsListColumn(column);

        this.setState({
            activeColumns: toggleColumnsResponse.data,
        });
    };

    render() {
        const {loading, transactions, backfillingStatus, filters, page, perPage, activeColumns, refreshSubscriber, fetching, error} = this.state;
        const {contracts, contractRevisions, project, projectTags, accountPlan} = this.props;

        const projectIsSetup = contracts.length > 0;
        const isPolling = !!refreshSubscriber || loading;

        const shouldDisplayListAndFilters = !!transactions.length || page !== 1 || Object.values(filters).length || fetching;

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
                        {shouldDisplayListAndFilters && <TransactionFilters plan={accountPlan} activeFilters={filters} activeColumns={activeColumns} contracts={contracts} tags={projectTags} onFiltersChange={this.handleFilterChange} onColumnToggle={this.handleColumnToggle}/>}
                        {shouldDisplayListAndFilters && <TransactionsList transactions={transactions} contracts={contracts}
                                          loading={fetching} project={project} activeColumns={activeColumns} contractRevisions={contractRevisions}
                                          currentPage={page} onPageChange={this.handlePageChange}
                                          perPage={perPage} onPerPageChange={this.handlePerPageChange}/>}
                        {!shouldDisplayListAndFilters && <NoTransactionsEmptyState error={error}/>}
                        {!!backfillingStatus && <BackfillingProgress context="project" status={backfillingStatus}/>}
                    </Fragment>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug}}, location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const queryPage = parseInt(searchParams.get('page')) || 1;
    const queryPerPage = parseInt(searchParams.get('perPage')) || DEFAULT_TX_PER_PAGE;
    const queryFilters = {};

    if (searchParams.get('status')) {
        queryFilters[TransactionFilterTypes.STATUS] = {
            type: TransactionFilterTypes.STATUS,
            value: searchParams.get('status'),
        };
    }

    if (searchParams.get('type')) {
        queryFilters[TransactionFilterTypes.TYPE] = {
            type: TransactionFilterTypes.TYPE,
            value: searchParams.get('type'),
        };
    }

    if (searchParams.get('network')) {
        queryFilters[TransactionFilterTypes.NETWORKS] = {
            type: TransactionFilterTypes.NETWORKS,
            value: searchParams.get('network'),
        };
    }

    if (searchParams.get('contracts')) {
        queryFilters[TransactionFilterTypes.CONTRACTS] = {
            type: TransactionFilterTypes.CONTRACTS,
            value: searchParams.getAll('contracts'),
        };
    }

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        queryPage,
        queryPerPage,
        queryFilters,
        project,
        accountPlan: getAccountPlanForProject(state, project),
        contracts: getContractsForProject(state, project.id),
        contractRevisions: getProjectContractRevisions(state, project.id),
        projectTags: getProjectTags(state, project),
        contractsLoaded: areProjectContractsLoaded(state, project.id),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        txActions: bindActionCreators(transactionActions, dispatch),
        projectActions: bindActionCreators(projectActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectTransactionsPage);
