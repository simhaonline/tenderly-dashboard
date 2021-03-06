import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    getTransaction,
    getTransactionCallTrace, getTransactionEventLogs, getTransactionsConsoleLogs,
    getTransactionStackTrace, getTransactionStateDiffs
} from "../../Common/Selectors/TransactionSelectors";
import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {
    DASHBOARD_BASE_URL,
    EtherscanLinkTypes,
    ProjectTypes
} from "../../Common/constants";

import {getNetworkForRouteSlug, getRouteSlugForNetwork} from "../../Utils/RouterHelpers";
import Notifications from "../../Utils/Notifications";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Page, Container, Button, Icon, PageHeading} from "../../Elements";
import {
    ProjectContentLoader,
    PageError,
    TransactionPageContent,
    EtherscanLink,
    SharePageButton, TransactionGeneralInformation, CopyableText
} from "../../Components";
import {generateShortAddress} from "../../Utils/AddressFormatter";

class ProjectTransactionPage extends Component {
    constructor(props) {
        super(props);

        const {location: {state: locationState}, match: {params: {slug, username, txHash, network}}} = props;

        const routeBase = `/${username}/${slug}/tx/${network}/${txHash}`;

        const previousPageQuery = locationState && locationState.previousPageQuery;

        this.state = {
            error: null,
            loadedTx: false,
            loading: true,
            previousPageQuery,
            tabs: [
                {
                    route: `${routeBase}`,
                    label: 'Overview',
                    icon: 'align-right',
                },
                {
                    route: `${routeBase}/contracts`,
                    label: 'Contracts',
                    icon: 'file-text',
                },
                {
                    route: `${routeBase}/logs`,
                    label: 'Events',
                    icon: 'bookmark',
                },
                {
                    route: `${routeBase}/state-diff`,
                    label: 'State Changes',
                    icon: 'code',
                },
                {
                    route: `${routeBase}/debugger`,
                    label: 'Debugger',
                    icon: 'terminal',
                },
                {
                    route: `${routeBase}/gas-usage`,
                    label: 'Gas Profiler',
                    icon: 'cpu',
                },
            ],
        };
    }

    async componentDidMount() {
        this.fetchTransaction()
    }

    async componentDidUpdate(prevProps,prevState) {
        const {txHash, networkType} = this.props;
        if (txHash !== prevProps.txHash || networkType !== prevProps.networkType){
            this.setState({
                loading: true,
            }, this.fetchTransaction)
        }
    }

    fetchTransaction = async () => {
        const {project, transaction, callTrace, contractActions, txActions, txHash, networkType} = this.props;

        let txContracts = [];

        if (project.type !== ProjectTypes.DEMO) {
            await Promise.all([
                (async () => {
                    if (!transaction || !callTrace) {
                        const actionResponse = await txActions.fetchTransactionForProject(project, txHash, networkType);

                        if (!actionResponse.success) {
                            Notifications.error({title: "Failed fetching transaction"});

                            this.setState({
                                error: "There was an error trying to fetch information about this transaction.",
                            });
                        }

                        this.setState({
                            loadedTx: true,
                        });
                    }
                })(),
                (async () => {
                    const contractsResponse = await contractActions.fetchContractsForTransaction(project, txHash, networkType);

                    if (contractsResponse.success) {
                        txContracts = contractsResponse.data;
                    }
                })(),
            ]);
        } else {
            await txActions.fetchExampleTransaction();
            const exampleContractsResponse = await contractActions.fetchExampleContractsForTransaction(project.id);

            txContracts = exampleContractsResponse.data;
        }

        this.setState({
            loading: false,
            txContracts,
        });
    };

    render() {
        const {transaction, callTrace, stackTrace, eventLogs, stateDiffs, project, txHash, networkType, consoleLogs} = this.props;
        const {error, tabs, loading, txContracts, loadedTx, previousPageQuery} = this.state;

        const backUrl = {
            pathname: `/${project.owner}/${project.slug}/transactions`,
            search: previousPageQuery,
        };

        if (error) {
            return (
                <Page tabs={tabs}>
                    <Container>
                        <PageHeading>
                            <Button to={backUrl} outline>
                                <Icon icon="arrow-left"/>
                            </Button>
                            <div>
                                <h1>Transaction</h1>
                                <div className="MonospaceFont">{generateShortAddress(txHash, 12, 8)}</div>
                            </div>
                        </PageHeading>
                        <PageError>
                            <p>{error}</p>
                            <Button to={backUrl} outline>
                                <Icon icon="arrow-left"/>
                                <span>Go Back to Transactions</span>
                            </Button>
                        </PageError>
                    </Container>
                </Page>
            )
        }

        if (loading) {
            return (
                <Page tabs={tabs}>
                    <Container>
                        <PageHeading>
                            <Button to={backUrl} outline>
                                <Icon icon="arrow-left"/>
                            </Button>
                            <div>
                                <h1>Transaction</h1>
                                <CopyableText text={txHash} render={(props)=> <span className={`MonospaceFont LinkText ${props.className}`}>{generateShortAddress(txHash, 12, 8)}</span>} position="right" onSuccessMessage="Copied contract address to clipboard"/>
                            </div>
                            <div className="RightContent">
                                <EtherscanLink type={EtherscanLinkTypes.TRANSACTION} network={networkType} value={txHash}>
                                    <Button size="small" outline>
                                        <Icon icon="globe"/>
                                        <span>View in Explorer</span>
                                    </Button>
                                </EtherscanLink>
                            </div>
                        </PageHeading>
                        {loadedTx && !!transaction && <TransactionGeneralInformation contracts={[]} transaction={transaction} project={project}/>}
                        {!loadedTx && <ProjectContentLoader text="Fetching transaction..."/>}
                        {loadedTx && <ProjectContentLoader text="Fetching execution data..."/>}
                    </Container>
                </Page>
            );
        }

        const canBeViewedOnExplorer = txContracts.some(contract => contract.isVerifiedPublic);

        return (
            <Page id="ProjectTransactionsPage" tabs={tabs}>
                <Container>
                    <PageHeading>
                        <Button to={backUrl} outline>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <div>
                            <h1>Transaction</h1>
                            <CopyableText text={txHash} render={(props)=> <span className={`MonospaceFont LinkText ${props.className}`}>{generateShortAddress(txHash, 12, 8)}</span>} position="right" onSuccessMessage="Copied contract address to clipboard"/>
                        </div>
                        {!!transaction && <div className="RightContent">
                            {canBeViewedOnExplorer && <SharePageButton url={`${DASHBOARD_BASE_URL}/tx/${getRouteSlugForNetwork(transaction.network)}/${transaction.txHash}`}
                                                                       onCopyMessage="Copied link to the public transaction page"/>}
                            <EtherscanLink type={EtherscanLinkTypes.TRANSACTION} network={transaction.network} value={transaction.txHash}>
                                <Button size="small" outline>
                                    <Icon icon="globe"/>
                                    <span>View in Explorer</span>
                                </Button>
                            </EtherscanLink>
                        </div>}
                    </PageHeading>
                    {!!transaction && <TransactionPageContent transaction={transaction} contracts={txContracts} stackTrace={stackTrace}
                                            callTrace={callTrace} project={project} eventLogs={eventLogs}
                                            stateDiffs={stateDiffs} consoleLogs={consoleLogs}/>}
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {slug, username, txHash, network}}} = ownProps;

    const transaction = getTransaction(state, txHash);

    const networkType = getNetworkForRouteSlug(network);

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        txHash,
        transaction,
        networkType,
        project,
        callTrace: getTransactionCallTrace(state, txHash),
        stackTrace: getTransactionStackTrace(state, txHash),
        eventLogs: getTransactionEventLogs(state, txHash),
        stateDiffs: getTransactionStateDiffs(state, txHash),
        consoleLogs: getTransactionsConsoleLogs(state,txHash),
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
)(ProjectTransactionPage);
