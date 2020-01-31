import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {areProjectContractsLoaded, getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {contractActions, transactionActions} from "../../Core/actions";

import {Button, Icon, Page, PageHeading} from "../../Elements";
import {ContractSimulator, ProjectContentLoader} from "../../Components";
import {Redirect} from "react-router-dom";

const SimulationStatusMap = {
    SETUP: 'setup',
    SIMULATING: 'simulating',
    SIMULATED: 'simulated',
};

class ProjectNewSimulationPage extends Component {
    state = {
        status: SimulationStatusMap.SETUP,
    };

    async componentDidMount() {
        const {actions, project, contractsLoaded} = this.props;

        if (!contractsLoaded) {
            await actions.fetchContractsForProject(project);
        }
    }

    handleTransactionSimulation = async (simulation) => {
        const {transactionActions, project} = this.props;
        this.setState({
            status: SimulationStatusMap.SIMULATING,
        });
        const response = await transactionActions.simulateTransaction(project, simulation);
        if(response.success){
            this.setState({
                simulatedTransaction: response.data.transaction,
            })
        }
    };

    render() {
        const {contractsLoaded, contracts, project} = this.props;
        const {status,simulatedTransaction} = this.state;

        if(simulatedTransaction){
            return <Redirect to={`${project.getUrlBase()}/simulator/${simulatedTransaction.id}`}/>
        }
        return (
            <Page>
                <PageHeading>
                    <Button outline to={`${project.getUrlBase()}/simulator`}>
                        <Icon icon="arrow-left"/>
                    </Button>
                    <h1>New Simulation</h1>
                </PageHeading>
                {!contractsLoaded && <ProjectContentLoader text="Fetching project contracts..."/>}
                {contractsLoaded && <Fragment>
                    {status === SimulationStatusMap.SETUP && <ContractSimulator contracts={contracts} project={project}
                                                                                onSubmit={this.handleTransactionSimulation}/>}
                    {status === SimulationStatusMap.SIMULATING && <ProjectContentLoader text="Simulating Transaction"/>}
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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(contractActions, dispatch),
        transactionActions: bindActionCreators(transactionActions, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectNewSimulationPage);
