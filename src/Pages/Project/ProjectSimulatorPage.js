import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Web3EthAbi from 'web3-eth-abi';

import {areProjectContractsLoaded, getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {contractActions} from "../../Core/actions";

import {Page, PageHeading} from "../../Elements";
import {ContractSimulator, ProjectContentLoader} from "../../Components";

const SimulationStatusMap = {
    SETUP: 'setup',
    SIMULATING: 'simulating',
    SIMULATED: 'simulated',
};

class ProjectSimulatorPage extends Component {
    state = {
        status: SimulationStatusMap.SETUP,
    };

    async componentDidMount() {
        const {actions, project, contractsLoaded} = this.props;

        if (!contractsLoaded) {
            await actions.fetchContractsForProject(project);
        }

        console.log(Web3EthAbi);
    }

    handleTransactionSimulation = (simulationData) => {
        this.setState({
            status: SimulationStatusMap.SIMULATING,
        });
    };

    render() {
        const {contractsLoaded, contracts, project} = this.props;
        const {status} = this.state;

        return (
            <Page>
                <PageHeading>
                    <h1>Simulator</h1>
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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectSimulatorPage);
