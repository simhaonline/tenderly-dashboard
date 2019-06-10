import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {getTransaction, getTransactionCallTrace} from "../../Common/Selectors/TransactionSelectors";
import {NetworkRouteToAppTypeMap} from "../../Common/constants";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as publicContractActions from "../../Core/PublicContracts/PublicContracts.actions";

import {CallTracePreview, ProjectPageLoader} from "../../Components";
import {Page, Container} from "../../Elements";
import {getPublicContractById} from "../../Common/Selectors/PublicContractSelectors";


class PublicContractTransactionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            transaction: null,
        }
    }

    async componentDidMount() {
        const {contractId, txHash, networkType, contract, transaction, callTrace, txActions, contractActions} = this.props;

        if (!contract) {
            await contractActions.fetchPublicContract(contractId, networkType);
        }

        if (!transaction || !callTrace) {
            await txActions.fetchTransactionForPublicContract(txHash, networkType);
        }

        this.setState({
            loaded: true,
        });
    }

    render() {
        const {loaded, } = this.state;
        const {contract, callTrace} = this.props;

        if (!loaded) {
            return <ProjectPageLoader text="Fetching Transaction Data..."/>;
        }

        return (
            <Page>
                <Container>
                    <CallTracePreview callTrace={callTrace} contract={contract}/>
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
        contractId: id,
        callTrace: getTransactionCallTrace(state, txHash),
        contract: getPublicContractById(state, id),
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
