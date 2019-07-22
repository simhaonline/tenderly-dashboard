import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import {Redirect, Route, Switch} from "react-router-dom";

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
    TransactionsList, EtherscanLink, SharePageButton, ContractFileSource
} from "../../Components";

class PublicContractPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actionInProgress: false,
            loading: true,
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

    toggleWatchedContract = async () => {
        const {actions, contract, networkType} = this.props;

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
        const {loading, transactions, page, actionInProgress, fetching} = this.state;

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
                    <Switch>
                        <Route path="/contract/:network/:id" exact render={() => (
                            <TransactionsList transactions={transactions} contracts={[contract]} isPublicContracts
                                              loading={fetching}
                                              currentPage={page} onPageChange={this.handlePageChange}/>
                        )}/>
                        <Route path="/contract/:network/:id/source" render={() => (
                            <ContractFileSource file={contract.mainFile}/>
                        )}/>
                        <Redirect to={`/project/${contract.address}/transactions`}/>
                    </Switch>
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
        contract: getPublicContractById(state, contractAddress),
        contractLoaded: isPublicContractLoaded(state, contractAddress),
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
