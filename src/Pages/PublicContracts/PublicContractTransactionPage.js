import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {
    getTransaction,
    getTransactionCallTrace,
    getTransactionStackTrace
} from "../../Common/Selectors/TransactionSelectors";
import {NetworkRouteToAppTypeMap} from "../../Common/constants";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as publicContractActions from "../../Core/PublicContracts/PublicContracts.actions";

import {ProjectPageLoader, TransactionPageContent} from "../../Components";
import {Page, Container} from "../../Elements";
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
        const {txHash, networkType, contractsLoaded, transaction, callTrace, txActions} = this.props;

        let tx = transaction;

        if (!transaction || !callTrace) {
            const actionResponse = await txActions.fetchTransactionForPublicContract(txHash, networkType);

            tx = actionResponse.data;
        }

        if (tx && !contractsLoaded) {
            // @TODO Fetch multiple contracts
        }

        this.setState({
            loaded: true,
        });
    }

    render() {
        const {loaded, } = this.state;
        const {contract, transaction, callTrace} = this.props;

        if (!loaded) {
            return <ProjectPageLoader text="Fetching Transaction Data..."/>;
        }

        return (
            <Page>
                <Container>
                    <TransactionPageContent transaction={transaction} contract={contract} callTrace={callTrace}/>
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {txHash, network}}} = ownProps;

    const transaction = getTransaction(state, txHash);

    const networkType = NetworkRouteToAppTypeMap[network];

    return {
        txHash,
        transaction,
        networkType,
        callTrace: getTransactionCallTrace(state, txHash),
        stackTrace: getTransactionStackTrace(state, txHash),
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
