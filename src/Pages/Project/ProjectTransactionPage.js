import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getContractForTransaction} from "../../Common/Selectors/ContractSelectors";
import {getTransaction} from "../../Common/Selectors/TransactionSelectors";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Page, Container} from "../../Elements";
import {ProjectContentLoader} from "../../Components";

class ProjectTransactionPage extends Component {
    async componentDidMount() {
        const {transaction, contract, projectId, contractActions, txActions, txHash} = this.props;

        if (!transaction) {
            await txActions.fetchTransactionForProject(projectId, txHash);
        }

        if (!contract) {
            await contractActions.fetchContractsForProject(projectId);
        }
    }

    render() {
        const {transaction, contract} = this.props;

        if (!transaction || !contract) {
            return (
                <Page>
                    <Container>
                        <ProjectContentLoader text="Fetching transaction..."/>
                    </Container>
                </Page>
            );
        }

        return (
            <Page id="ProjectTransactionsPage">
                <Container>
                    Hello {transaction.txHash}
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id, txHash}}} = ownProps;

    const transaction = getTransaction(state, txHash);

    console.log(transaction);

    return {
        projectId: id,
        txHash,
        transaction,
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
