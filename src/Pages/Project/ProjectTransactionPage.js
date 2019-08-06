import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    getTransaction,
    getTransactionCallTrace,
    getTransactionStackTrace
} from "../../Common/Selectors/TransactionSelectors";
import {getProject} from "../../Common/Selectors/ProjectSelectors";
import {EtherscanLinkTypes, NetworkRouteToAppTypeMap, ProjectTypes} from "../../Common/constants";

import Notifications from "../../Utils/Notifications";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Page, Container, Button, Icon, PageHeading} from "../../Elements";
import {ProjectContentLoader, PageError, TransactionPageContent, EtherscanLink} from "../../Components";

class ProjectTransactionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            loading: true,
        };
    }

    async componentDidMount() {
        const {project, transaction, callTrace, projectId, contractActions, txActions, txHash, networkType} = this.props;

        if (project.type !== ProjectTypes.DEMO) {
            if (!transaction || !callTrace) {
                const actionResponse = await txActions.fetchTransactionForProject(projectId, txHash, networkType);

                if (!actionResponse.success) {
                    Notifications.error({title: "Failed fetching transaction"});

                    this.setState({
                        error: "There was an error trying to fetch information about this transaction.",
                    });
                }

            }

            const contractsResponse = await contractActions.fetchContractsForTransaction(projectId, txHash, networkType);

            if (contractsResponse.success) {
                this.setState({
                    txContracts: contractsResponse.data,
                });
            }
        } else {
            await txActions.fetchExampleTransaction();
        }

        this.setState({
            loading: false,
        });
    }

    render() {
        const {transaction, callTrace, stackTrace, projectId} = this.props;
        const {error, loading, txContracts} = this.state;

        if (loading) {
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

        return (
            <Page id="ProjectTransactionsPage">
                <Container>
                    <PageHeading>
                        <Button to={`/project/${projectId}/transactions`} outline>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>Transaction</h1>
                        <div className="RightContent">
                            <EtherscanLink type={EtherscanLinkTypes.TRANSACTION} network={transaction.network} value={transaction.txHash}>
                                <Button size="small" outline>
                                    <Icon icon="globe"/>
                                    <span>View in Explorer</span>
                                </Button>
                            </EtherscanLink>
                        </div>
                    </PageHeading>
                    <TransactionPageContent transaction={transaction} contracts={txContracts} stackTrace={stackTrace} callTrace={callTrace}/>
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
        stackTrace: getTransactionStackTrace(state, txHash),
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
