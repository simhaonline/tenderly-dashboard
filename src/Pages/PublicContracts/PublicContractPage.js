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

import {EtherscanLinkTypes, NetworkRouteToAppTypeMap} from "../../Common/constants";

import {Page, Container, PageHeading, Button, Icon, ButtonGroup} from "../../Elements";
import {
    ContractInformation,
    ContractActions,
    ProjectPageLoader,
    TransactionsList, EtherscanLink
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
        const {contract, contractLoaded, networkType, actions, txActions, contractId, watchedContractsLoaded} = this.props;

        if (!contract || !contractLoaded) {
            await actions.fetchPublicContract(contractId, networkType);
        }

        const response = await txActions.fetchTransactionsForPublicContract(contractId, networkType);

        let transactions = [];

        if (response.success) {
           transactions = response.data;
        }

        if (!watchedContractsLoaded) {
            actions.fetchWatchedContracts();
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

        await actions.toggleWatchedContract(contract, networkType);

        await actions.fetchPublicContract(contract.address, networkType);

        this.setState({
            actionInProgress: false,
        });
    };

    handlePageChange = () => {};

    handleBackClick = () => {
        const {history} = this.props;

        history.goBack();
    };

    render() {
        const {contract, isContractWatched, match: {params: { network }}, watchedContractsLoaded} = this.props;
        const {loading, transactions, page, actionInProgress} = this.state;

        if (loading) {
            return (
                <ProjectPageLoader text="Fetching Public Contract Data..."/>
            )
        }

        return (
            <Page>
                <Container>
                    <PageHeading>
                        <Button outline onClick={this.handleBackClick}>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>{contract.name}</h1>
                        <div className="RightContent">
                            <ButtonGroup>
                                <Button outline={!isContractWatched} size="small" color="secondary"
                                        onClick={this.toggleWatchedContract} disabled={actionInProgress || !watchedContractsLoaded}>
                                    <Icon icon="star"/>
                                    {!isContractWatched && <span>Watch</span>}
                                    {isContractWatched && <span>Unwatch</span>}
                                </Button>
                                <Button size="small" color="secondary" readOnly>
                                    <span>{contract.watchCount}</span>
                                </Button>
                            </ButtonGroup>
                            <EtherscanLink type={EtherscanLinkTypes.BLOCK} network={contract.network} value={contract.address}>
                                <Button size="small" outline>
                                    <Icon icon="globe"/>
                                    <span>View in Explorer</span>
                                </Button>
                            </EtherscanLink>
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

    const loggedIn = state.auth.loggedIn;

    return {
        networkType,
        contractId: id,
        loggedIn,
        contract: getPublicContractById(state, id),
        contractLoaded: isPublicContractLoaded(state, id),
        isContractWatched: isPublicContractWatched(state, id, networkType),
        watchedContractsLoaded: loggedIn ? areWatchedContractsLoaded(state): true,
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
