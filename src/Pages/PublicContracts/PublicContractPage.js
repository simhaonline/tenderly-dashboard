import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as publicContractsActions from "../../Core/PublicContracts/PublicContracts.actions";
import * as transactionActions from "../../Core/Transaction/Transaction.actions";

import {
    getPublicContractById,
    isPublicContractLoaded
} from "../../Common/Selectors/PublicContractSelectors";

import {NetworkRouteToAppTypeMap} from "../../Common/constants";

import {Page, Container} from "../../Elements";
import {
    ContractInformation,
    ContractActions,
    ProjectPageLoader,
    TransactionsList
} from "../../Components";

class PublicContractPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            page: 1,
        };
    }

    async componentDidMount() {
        const {contract, contractLoaded, networkType, actions, txActions, contractId} = this.props;

        if (!contract || !contractLoaded) {
            await actions.fetchPublicContract(contractId, networkType);
        }

        const response = await txActions.fetchTransactionsForPublicContract(contractId, networkType);

        let transactions = [];

        if (response.success) {
           transactions = response.data;
        }

        this.setState({
            loading: false,
            transactions,
        });
    }

    handlePageChange = () => {};

    render() {
        const {contract, match: {params: { network }}} = this.props;
        const {loading, transactions, page} = this.state;

        if (loading) {
            return (
                <ProjectPageLoader text="Fetching Public Contract Data..."/>
            )
        }

        return (
            <Page>
                <Container>
                    <ContractInformation contract={contract} back/>
                    <ContractActions contract={contract} routeNetwork={network}/>
                    <TransactionsList transactions={transactions} contracts={[contract]} publicContracts
                                      currentPage={page} onPageChange={this.handlePageChange}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: { id, network }}} = ownProps;

    const networkType = NetworkRouteToAppTypeMap[network];

    return {
        networkType,
        contractId: id,
        contract: getPublicContractById(state, id),
        contractLoaded: isPublicContractLoaded(state, id),
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
