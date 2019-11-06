import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";

import Analytics from "../../Utils/Analytics";

import {
    getTransaction,
    getTransactionCallTrace, getTransactionEventLogs,
    getTransactionStackTrace, getTransactionStateDiffs
} from "../../Common/Selectors/TransactionSelectors";
import {
    arePublicContractsLoadedForTransaction,
    getPublicContractsForTransaction
} from "../../Common/Selectors/PublicContractSelectors";
import {EtherscanLinkTypes} from "../../Common/constants";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as publicContractActions from "../../Core/PublicContracts/PublicContracts.actions";

import NoTransactionsIcon from "../../Components/NoTransactionsEmptyState/no-transactions-icon.svg";

import {Page, Container, Button, Icon, PageHeading, Panel, PanelContent} from "../../Elements";
import {EmptyState, EtherscanLink, ProjectPageLoader, SharePageButton, TransactionPageContent} from "../../Components";
import {getNetworkForRouteSlug} from "../../Utils/RouterHelpers";

class PublicContractTransactionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            transaction: null,
        }
    }

    async componentDidMount() {
        const {txHash, networkType, contractsLoaded, transaction, contractActions, callTrace, txActions} = this.props;

        let tx = transaction;

        if (!transaction || !callTrace) {
            const actionResponse = await txActions.fetchTransactionForPublicContract(txHash, networkType);

            if (actionResponse.success) {
                tx = actionResponse.data.transaction;
            } else {
                return this.setState({
                    loaded: true,
                    error: true,
                });
            }
        }

        if (tx && !contractsLoaded) {
            await contractActions.fetchPublicContractsForTransaction(tx);
        }

        Analytics.page('Loaded Public Transaction Page');

        this.setState({
            loaded: true,
        });
    }

    handleBackClick = () => {
        const {history} = this.props;

        history.goBack();
    };

    render() {
        const {loaded, error} = this.state;
        const {contracts, transaction, callTrace, stackTrace, networkType, txHash, stateDiffs, eventLogs} = this.props;

        return (
            <Page>
                <Container>
                    <Helmet>
                        <title>{txHash} | Tenderly</title>
                    </Helmet>
                    <PageHeading>
                        <Button outline onClick={this.handleBackClick}>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>Transaction</h1>
                        <div className="RightContent">
                            <SharePageButton/>
                            <EtherscanLink type={EtherscanLinkTypes.TRANSACTION} network={networkType} value={txHash}>
                                <Button size="small" outline>
                                    <Icon icon="globe"/>
                                    <span className="HideMobile">View in Explorer</span>
                                </Button>
                            </EtherscanLink>
                        </div>
                    </PageHeading>
                    {!loaded && <ProjectPageLoader text="Fetching Transaction Data..."/>}
                    {loaded && !error && <TransactionPageContent transaction={transaction} contracts={contracts} callTrace={callTrace} stackTrace={stackTrace} eventLogs={eventLogs} stateDiffs={stateDiffs}/>}
                    {loaded && error && <Panel>
                        <PanelContent>
                            <EmptyState image={NoTransactionsIcon} title="Bummer, we couldn't find this transaction" description="This transaction probably has not been processed by us yet or the transaction hash is not a valid one."/>
                        </PanelContent>
                    </Panel>}
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {txHash, network}}} = ownProps;

    const transactionHash = txHash.toLowerCase();
    const transaction = getTransaction(state, transactionHash);

    const networkType = getNetworkForRouteSlug(network);

    return {
        txHash: transactionHash,
        transaction,
        networkType,
        callTrace: getTransactionCallTrace(state, transactionHash),
        stackTrace: getTransactionStackTrace(state, transactionHash),
        eventLogs: getTransactionEventLogs(state, transactionHash),
        stateDiffs: getTransactionStateDiffs(state, transactionHash),
        contracts: getPublicContractsForTransaction(state, transaction),
        contractsLoaded: arePublicContractsLoadedForTransaction(state, transaction),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        txActions: bindActionCreators(transactionActions, dispatch),
        contractActions: bindActionCreators(publicContractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicContractTransactionPage);
