import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as publicContractsActions from "../../Core/PublicContracts/PublicContracts.actions";
import * as transactionActions from "../../Core/Transaction/Transaction.actions";

import {
    areWatchedContractsLoaded,
    getPublicContractById,
    isPublicContractLoaded, isPublicContractWatched
} from "../../Common/Selectors/PublicContractSelectors";

import {NetworkAppToRouteTypeMap, NetworkRouteToAppTypeMap} from "../../Common/constants";

import {Page, Container, PageHeading, Button, Icon} from "../../Elements";
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
            actionInProgress: false,
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

    toggleWatchedContract = async () => {
        const {actions, contract, networkType} = this.props;

        this.setState({
            actionInProgress: true,
        });

        await actions.toggleWatchedContract(contract.address, networkType);

        this.setState({
            actionInProgress: false,
        });
    };

    handlePageChange = () => {};

    render() {
        const {contract, isContractWatched, match: {params: { network }}} = this.props;
        const {loading, transactions, page, actionInProgress} = this.state;

        if (loading) {
            return (
                <ProjectPageLoader text="Fetching Public Contract Data..."/>
            )
        }

        const networkRoute = NetworkAppToRouteTypeMap[contract.network];

        return (
            <Page>
                <Container>
                    <PageHeading>
                        <Button outline to={`/public-contracts/${networkRoute}`}>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>{contract.name}</h1>
                        <div className="RightContent">
                            <Button outline={!isContractWatched} size="small"
                                    onClick={this.toggleWatchedContract} disabled={actionInProgress}>
                                <Icon icon="star"/>
                                {!isContractWatched && <span>Watch Contract</span>}
                                {isContractWatched && <span>Un-watch Contract</span>}
                            </Button>
                        </div>
                    </PageHeading>
                    <ContractInformation contract={contract} back/>
                    <ContractActions contract={contract} routeNetwork={network}/>
                    <TransactionsList transactions={transactions} contracts={[contract]} isPublicContracts
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
        isContractWatched: isPublicContractWatched(state, id, networkType),
        watchedContractsLoaded: areWatchedContractsLoaded(state),
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
