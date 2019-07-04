import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";

import {
    getTransaction,
    getTransactionCallTrace,
    getTransactionStackTrace
} from "../../Common/Selectors/TransactionSelectors";
import {EtherscanLinkTypes, NetworkRouteToAppTypeMap} from "../../Common/constants";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as publicContractActions from "../../Core/PublicContracts/PublicContracts.actions";

import {EtherscanLink, ProjectPageLoader, SharePageButton, TransactionPageContent} from "../../Components";
import {Page, Container, Button, Icon, PageHeading} from "../../Elements";
import {
    arePublicContractsLoadedForTransaction,
    getPublicContractsForTransaction
} from "../../Common/Selectors/PublicContractSelectors";

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

            tx = actionResponse.data.transaction;
        }

        if (tx && !contractsLoaded) {
            await contractActions.fetchPublicContractsForTransaction(tx);
        }

        this.setState({
            loaded: true,
        });
    }

    handleBackClick = () => {
        const {history} = this.props;

        history.goBack();
    };

    render() {
        const {loaded} = this.state;
        const {contracts, transaction, callTrace, stackTrace, networkType, txHash} = this.props;

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
                    {loaded && <TransactionPageContent transaction={transaction} contracts={contracts} callTrace={callTrace} stackTrace={stackTrace}/>}
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {txHash, network}}} = ownProps;

    const transactionHash = txHash.toLowerCase();
    const transaction = getTransaction(state, transactionHash);

    const networkType = NetworkRouteToAppTypeMap[network];

    return {
        txHash: transactionHash,
        transaction,
        networkType,
        callTrace: getTransactionCallTrace(state, transactionHash),
        stackTrace: getTransactionStackTrace(state, transactionHash),
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
