import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getProject} from "../../Common/Selectors/ProjectSelectors";
import {getContractForTransaction} from "../../Common/Selectors/ContractSelectors";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Page, Container} from "../../Elements";
import {getTransaction} from "../../Common/Selectors/TransactionSelectors";

class ProjectTransactionPage extends Component {
    render() {
        return (
            <Page id="ProjectTransactionsPage">
                <Container>

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
        project: getProject(state, id),
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
