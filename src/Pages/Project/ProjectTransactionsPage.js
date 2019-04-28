import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from "moment";

import {areProjectContractsLoaded, getProject} from "../../Common/Selectors/ProjectSelectors";
import {ProjectTypes} from "../../Common/constants";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Container, Page} from "../../Elements";
import {ProjectContentLoader, TransactionsList, TransactionFilters} from "../../Components";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

class ProjectTransactionsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            lastFetch: null,
            page: props.page,
            projectSetup: false,
            transactions: [],
            filters: [],
        };
    }

    async componentDidMount() {
        const {project, txActions, contractActions, contractsLoaded} = this.props;
        const {filters, page} = this.state;

        let transactions = [];

        if (project.type !== ProjectTypes.DEMO) {
            transactions = await txActions.fetchTransactionsForProject(project.id, filters, page);

            if (!contractsLoaded) {
                await contractActions.fetchContractsForProject(project.id);
            }

            this.setState({
                loading: false,
                transactions,
                lastFetch: moment.now(),
            });
        } else {
            // @TODO Logic for getting demo transactions
            // transactions = getDemoTransactions();
        }

        this.setState({
            loading: false,
            transactions,
            lastFetch: moment.now(),
        });
    }

    handleFilterChange = () => {

    };

    handlePageChange = () => {

    };

    render() {
        const {loading, transactions, projectSetup, lastFetch, filters, page} = this.state;
        const {contracts} = this.props;

        return (
            <Page id="ProjectPage">
                <Container>
                    {loading && <ProjectContentLoader text="Fetching project transactions..."/>}
                    {!loading && <Fragment>
                        <TransactionFilters lastSync={lastFetch} activeFilters={filters} onFilter={this.handleFilterChange}/>
                        <TransactionsList transactions={transactions} contracts={contracts} currentPage={page} onPageChange={this.handlePageChange}/>
                    </Fragment>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}, location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const queryPage = parseInt(searchParams.get('page')) || 1;

    return {
        project: getProject(state, id),
        page: queryPage,
        contracts: getContractsForProject(state, id),
        contractsLoaded: areProjectContractsLoaded(state, id),
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
)(ProjectTransactionsPage);
