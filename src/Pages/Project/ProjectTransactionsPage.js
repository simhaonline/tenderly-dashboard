import React, {Component} from 'react';
import {connect} from "react-redux";

import {getProject} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page} from "../../Elements";
import {ProjectContentLoader, TransactionsList} from "../../Components";

class ProjectTransactionsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            projectSetup: false,
            transactions: [],
        };
    }

    render() {
        const {loading, transactions, projectSetup} = this.state;

        return (
            <Page id="ProjectPage">
                <Container>
                    {loading && <ProjectContentLoader text="Fetching project transactions..."/>}
                    {!loading && <TransactionsList transactions={transactions}/>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}} = ownProps;

    return {
        project: getProject(state, id),
    }
};

export default connect(
    mapStateToProps,
    null
)(ProjectTransactionsPage);
