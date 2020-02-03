import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Page, PanelContent} from "../../Elements";
import PageHeading from "../../Elements/Page/PageHeading";
import {areProjectContractsLoaded, getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";
import Button from "../../Elements/Button/Button";
import {EmptyState, ProjectContentLoader, TransactionsList} from "../../Components";
import Panel from "../../Elements/Panel/Panel";
import {
    getSimulatedTransactionData,
    getSimulatedTransactionsForProject
} from "../../Common/Selectors/SimulatorSelectors";
import {DEFAULT_SIMULATED_TRANSACTIONS_LIST_COLUMNS} from "../../Common/constants";

class ProjectSimulatorPage extends Component {
    state = {
        transactions: [],
        loaded: false,

    };
    componentDidMount() {
        this.setState({
            loaded: true,
        })
    };

    render() {
        const {project, transactions, contracts} = this.props;
        const {loaded, } = this.state;
        console.log(transactions);

        return (
            <Page>
                <PageHeading>
                    <h1>Simulator</h1>
                    <div className="MarginLeftAuto">
                        <Button to={`${project.getUrlBase()}/simulator/new`}>
                            <span>New Simulation</span>
                        </Button>
                    </div>
                </PageHeading>
                {!loaded && <ProjectContentLoader text="Loading simulated transactions..."/>}
                {loaded && <Fragment>
                    {transactions.length===0 &&<Panel><PanelContent>
                        <EmptyState icon="airplay" title="No Transactions" description="You have not performed any simulated transactions yet"
                                    renderActions={()=><Button to={`${project.getUrlBase()}/simulator/new`} color="secondary">
                                        <span>Run Simulation</span>
                                    </Button>}/>
                    </PanelContent></Panel>}
                    {transactions.length > 0 && <TransactionsList transactions={transactions} contracts={contracts}
                                        project={project} activeColumns={DEFAULT_SIMULATED_TRANSACTIONS_LIST_COLUMNS}/>}
                </Fragment>}
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {slug, username}}} = ownProps;

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        project,
        contracts: getContractsForProject(state, project.id),
        contractsLoaded: areProjectContractsLoaded(state, project.id),
        transactions: getSimulatedTransactionsForProject(state, project.id),
    }
};

export default connect(
    mapStateToProps,
)(ProjectSimulatorPage);