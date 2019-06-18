import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getContractForTransaction} from "../../Common/Selectors/ContractSelectors";
import {
    getTransaction,
    getTransactionCallTrace,
    getTransactionStackTrace
} from "../../Common/Selectors/TransactionSelectors";
import {NetworkRouteToAppTypeMap} from "../../Common/constants";

import Notifications from "../../Utils/Notifications";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Page, Container, Button, Icon, PageHeading} from "../../Elements";
import {ProjectContentLoader, PageError, TransactionPageContent} from "../../Components";

class ProjectTransactionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };
    }

    async componentDidMount() {
        const {transaction, callTrace, contract, projectId, contractActions, txActions, txHash, networkType} = this.props;

        if (!transaction || !callTrace) {
            const actionResponse = await txActions.fetchTransactionForProject(projectId, txHash, networkType);

            if (!actionResponse.success) {
                Notifications.error("Failed fetching transaction");

                this.setState({
                    error: "There was an error trying to fetch information about this transaction.",
                });
            }

        }

        if (!contract) {
            await contractActions.fetchContractsForProject(projectId);
        }
    }

    render() {
        const {transaction, callTrace, stackTrace, contract, projectId} = this.props;
        const {error} = this.state;

        if (error) {
            return (
                <Page>
                    <Container>
                        <PageHeading>
                            <Button to={`/project/${projectId}/transactions`} outline>
                                <Icon icon="arrow-left"/>
                            </Button>
                            <h1>Transaction</h1>
                        </PageHeading>
                        <PageError>
                            <p>{error}</p>
                            <Button to={`/project/${projectId}/transactions`} outline>
                                <Icon icon="arrow-left"/>
                                <span>Go Back to Transactions</span>
                            </Button>
                        </PageError>
                    </Container>
                </Page>
            )
        }

        if (!transaction || !callTrace || !contract) {
            return (
                <Page>
                    <Container>
                        <PageHeading>
                            <Button to={`/project/${projectId}/transactions`} outline>
                                <Icon icon="arrow-left"/>
                            </Button>
                            <h1>Transaction</h1>
                        </PageHeading>
                        <ProjectContentLoader text="Fetching transaction..."/>
                    </Container>
                </Page>
            );
        }

        return (
            <Page id="ProjectTransactionsPage">
                <Container>
                    <PageHeading>
                        <Button to={`/project/${projectId}/transactions`} outline>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>Transaction</h1>
                    </PageHeading>
                    <TransactionPageContent transaction={transaction} contract={contract} stackTrace={stackTrace} callTrace={callTrace}/>
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id, txHash, network}}} = ownProps;

    const transaction = getTransaction(state, txHash);

    const networkType = NetworkRouteToAppTypeMap[network];

    return {
        txHash,
        transaction,
        networkType,
        projectId: id,
        callTrace: getTransactionCallTrace(state, txHash),
        stackTrace: getTransactionStackTrace(state, txHash),
        contract: getContractForTransaction(state, transaction),
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
