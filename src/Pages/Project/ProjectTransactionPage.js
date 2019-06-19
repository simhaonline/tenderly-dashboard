import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {toast} from "react-toastify";

import {getContractForTransaction} from "../../Common/Selectors/ContractSelectors";
import {getTransaction, getTransactionCallTrace} from "../../Common/Selectors/TransactionSelectors";
import {getProject} from "../../Common/Selectors/ProjectSelectors";
import {NetworkRouteToAppTypeMap, ProjectTypes} from "../../Common/constants";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Page, Container, Button, Icon} from "../../Elements";
import {ProjectContentLoader, PageError, TransactionPageContent} from "../../Components";

class ProjectTransactionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };
    }

    async componentDidMount() {
        const {project, transaction, callTrace, contract, projectId, contractActions, txActions, txHash, networkType} = this.props;

        if (project.type !== ProjectTypes.DEMO) {
            if (!transaction || !callTrace) {
                const actionResponse = await txActions.fetchTransactionForProject(projectId, txHash, networkType);

                if (!actionResponse.success) {
                    toast.error("Failed fetching transaction");

                    this.setState({
                        error: "There was an error trying to fetch information about this transaction.",
                    });
                }

            }

            if (!contract) {
                await contractActions.fetchContractsForProject(projectId);
            }
        } else {
            await txActions.fetchExampleTransaction();

        }
    }

    render() {
        const {transaction, callTrace, contract, projectId} = this.props;
        const {error} = this.state;

        if (error) {
            return (
                <Page>
                    <Container>
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
                        <ProjectContentLoader text="Fetching transaction..."/>
                    </Container>
                </Page>
            );
        }

        return (
            <Page id="ProjectTransactionsPage">
                <Container>
                    <TransactionPageContent transaction={transaction} contract={contract} callTrace={callTrace}/>
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
        project: getProject(state, id),
        callTrace: getTransactionCallTrace(state, txHash),
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
