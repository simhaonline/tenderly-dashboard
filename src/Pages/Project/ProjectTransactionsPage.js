import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from "moment";

import {getProject} from "../../Common/Selectors/ProjectSelectors";

import * as transactionActions from "../../Core/Transaction/Transaction.actions";

import {Container, Page} from "../../Elements";
import {ProjectContentLoader, TransactionsList, TransactionFilters} from "../../Components";

class ProjectTransactionsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            lastFetch: null,
            projectSetup: false,
            transactions: [],
            filters: [],
        };
    }

    async componentDidMount() {
        const {project, page, actions} = this.props;
        const {filters} = this.state;

        const transactions = await actions.fetchTransactionsForProject(project.id, filters, page);

        this.setState({
            loading: false,
            transactions,
            lastFetch: moment.now(),
        });
    }

    handleFilterChange = () => {

    };

    render() {
        const {loading, transactions, projectSetup, lastFetch, filters} = this.state;

        return (
            <Page id="ProjectPage">
                <Container>
                    {loading && <ProjectContentLoader text="Fetching project transactions..."/>}
                    {!loading && <Fragment>
                        <TransactionFilters lastSync={lastFetch} activeFilters={filters} onFilter={this.handleFilterChange}/>
                        <TransactionsList transactions={transactions}/>
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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(transactionActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectTransactionsPage);
