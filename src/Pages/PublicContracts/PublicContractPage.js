import React, {Component, Fragment} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import {Redirect, Route, Switch} from "react-router-dom";

import Analytics from '../../Utils/Analytics';

import * as publicContractsActions from "../../Core/PublicContracts/PublicContracts.actions";
import * as transactionActions from "../../Core/Transaction/Transaction.actions";

import {
    areWatchedContractsLoaded,
    getPublicContractById,
    isPublicContractLoaded, isPublicContractWatched
} from "../../Common/Selectors/PublicContractSelectors";

import {EtherscanLinkTypes, NetworkRouteToAppTypeMap} from "../../Common/constants";

import {Page, Container, PageHeading, Button, Icon, ButtonGroup, PanelContent, Panel} from "../../Elements";
import {
    ContractInformation,
    ProjectPageLoader,
    NetworkTag,
    TransactionsList, EtherscanLink, SharePageButton,
    PublicContractQuickActions,
    LoginRequiredModal,
    ContractFiles
} from "../../Components";

class PublicContractPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actionInProgress: false,
            loading: true,
            loginModalOpen: false,
            onLoginHandler: null,
            fetching: false,
            page: 1,
        };
    }

    async componentDidMount() {
        const {contract, contractLoaded, networkType, actions, contractId, watchedContractsLoaded} = this.props;

        if (!contract || !contractLoaded) {
            await actions.fetchPublicContract(contractId, networkType);
        }

        await this.fetchTransactions();

        if (!watchedContractsLoaded) {
            actions.fetchWatchedContracts();
        }

        Analytics.page('Loaded Public Contract Page');

        this.setState({
            loading: false,
        });
    }

    fetchTransactions = async () => {
        const {networkType, txActions, contractId} = this.props;
        const {page} = this.state;

        const response = await txActions.fetchTransactionsForPublicContract(contractId, networkType, page);

        let transactions = [];

        if (response.success) {
            transactions = response.data;
        }

        this.setState({
            transactions,
            fetching: false,
        });
    };

    openLoginModal = (onLoginHandler) => {
        this.setState({
            loginModalOpen: true,
            onLoginHandler,
        });
    };

    closeLoginModal = () => {
        this.setState({
            loginModalOpen: false,
        });
    };

    handleLogin = () => {
        const {onLoginHandler} = this.state;

        if (!onLoginHandler) {
            return;
        }

        onLoginHandler();

        this.setState({
            onLoginHandler: null,
        })
    };

    toggleWatchedContract = async () => {
        const {actions, contract, networkType, loggedIn} = this.props;

        if (!loggedIn) {
            this.openLoginModal(async () => {
                const watchedResponse = await actions.fetchWatchedContracts();

                if (watchedResponse.success && watchedResponse.data.every(watchedContract => watchedContract.getUniqueId() !== contract.getUniqueId())) {
                    this.toggleWatchedContract();
                }
            });
            return;
        }

        this.setState({
            actionInProgress: true,
        });

        await actions.toggleWatchedContract(contract, networkType);

        await actions.fetchPublicContract(contract.address, networkType);

        this.setState({
            actionInProgress: false,
        });
    };

    handlePageChange = (nextPage) => {
        const {loggedIn} = this.props;

        if (!loggedIn) {
            this.openLoginModal(async () => {
                this.handlePageChange(nextPage);
            });
            return;
        }

        this.setState({
            page: nextPage,
        }, () => {
            this.setState({
                fetching: true,
            });

            this.fetchTransactions();
        });
    };

    handleBackClick = () => {
        const {history} = this.props;

        history.goBack();
    };

    render() {
        const {contract, isContractWatched, networkType, watchedContractsLoaded, contractId} = this.props;
        const {loading, transactions, page, actionInProgress, fetching, loginModalOpen} = this.state;

        if (loading) {
            return (
                <ProjectPageLoader text="Fetching Public Contract Data..."/>
            )
        }
        if (!contract) {
            return (
                <Page>
                    <Container>
                        <PageHeading>
                            <NetworkTag network={networkType}/>
                            <h1>{contractId}</h1>
                        </PageHeading>
                        <Panel>
                            <PanelContent className="DisplayFlex AlignItemsCenter JustifyContentCenter">
                            </PanelContent>
                        </Panel>
                    </Container>
                </Page>
            );
        }

        return (
            <Page>
                <Container>
                    <Helmet>
                        <title>{contract.name} | Tenderly</title>
                    </Helmet>
                    <PageHeading>
                        <Button outline onClick={this.handleBackClick}>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>{contract.name}</h1>
                        <div className="RightContent">
                            <ButtonGroup>
                                <Button outline={!isContractWatched} size="small" color="secondary"
                                        onClick={this.toggleWatchedContract} disabled={actionInProgress || !watchedContractsLoaded}>
                                    <Icon icon="star"/>
                                    {!isContractWatched && <span className="HideMobile">Watch</span>}
                                    {isContractWatched && <span className="HideMobile">Unwatch</span>}
                                </Button>
                                <Button size="small" color="secondary" readOnly>
                                    <span>{contract.watchCount}</span>
                                </Button>
                            </ButtonGroup>
                            <SharePageButton/>
                            <EtherscanLink type={EtherscanLinkTypes.ADDRESS} network={contract.network} value={contract.address}>
                                <Button size="small" outline>
                                    <Icon icon="globe"/>
                                    <span className="HideMobile">View in Explorer</span>
                                </Button>
                            </EtherscanLink>
                        </div>
                    </PageHeading>
                    <ContractInformation contract={contract} back/>
                    <h2 className="MarginBottom2 MarginLeft2">Quick Actions</h2>
                    <PublicContractQuickActions contract={contract}/>
                    <Switch>
                        <Route path="/contract/:network/:id" exact render={() => (
                            <Fragment>
                                <h2 className="MarginBottom2 MarginLeft2">Transactions</h2>
                                <TransactionsList transactions={transactions} contracts={[contract]}
                                                  loading={fetching}
                                                  currentPage={page} onPageChange={this.handlePageChange}/>
                            </Fragment>
                        )}/>
                        <Route path="/contract/:network/:id/source" render={() => (
                            <Fragment>
                                <h2 className="MarginBottom2 MarginLeft2">Source Code</h2>
                                <ContractFiles contract={contract}/>
                            </Fragment>
                        )}/>
                        <Redirect to={`/project/${contract.address}/transactions`}/>
                    </Switch>
                    <LoginRequiredModal open={loginModalOpen} onClose={this.closeLoginModal} onLogin={this.handleLogin}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: { id, network }}} = ownProps;

    const contractAddress = id.toLowerCase();

    const networkType = NetworkRouteToAppTypeMap[network];

    const loggedIn = state.auth.loggedIn;

    return {
        networkType,
        contractId: id,
        loggedIn,
        contract: getPublicContractById(state, contractAddress, networkType),
        contractLoaded: isPublicContractLoaded(state, contractAddress, networkType),
        isContractWatched: isPublicContractWatched(state, contractAddress, networkType),
        watchedContractsLoaded: loggedIn ? areWatchedContractsLoaded(state): true,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(publicContractsActions, dispatch),
        txActions: bindActionCreators(transactionActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicContractPage);
