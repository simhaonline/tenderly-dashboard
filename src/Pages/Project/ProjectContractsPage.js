import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as contractActions from "../../Core/Contract/Contract.actions";

import {areProjectContractsLoaded, getProject} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {Container, Page, PageHeading} from "../../Elements";
import {ProjectSetupEmptyState, ProjectContractList, ProjectContentLoader, ProjectSetupGuide} from "../../Components";

class ProjectContractsPage extends Component {
    async componentDidMount() {
        const {actions, project, contractsLoaded} = this.props;

        const projectIsSetup = !!project.lastPushAt;

        if (projectIsSetup && !contractsLoaded) {
            await actions.fetchContractsForProject(project.id);
        }
    }

    /**
     * @param {Contract} contract
     */
    handleContractListeningToggle = (contract) => {
        const {actions} = this.props;

        actions.toggleContractListening(contract.projectId, contract.address, contract.network);
    };

    render() {
        const {project, contracts, contractsLoaded} = this.props;

        const projectIsSetup = !!project.lastPushAt;

        return (
            <Page id="ProjectContractsPage">
                <Container>
                    <PageHeading>
                        <h1>Contracts</h1>
                        {projectIsSetup && <div className="RightContent">
                            {contractsLoaded && <ProjectSetupGuide project={project} label="Add Contract" outline={false}
                                                                   initialCancelButtonLabel="Cancel"/>}
                        </div>}
                    </PageHeading>
                    {projectIsSetup && <Fragment>
                        {contractsLoaded && !!contracts.length && <ProjectContractList contracts={contracts} onListenToggle={this.handleContractListeningToggle}/>}
                        {contractsLoaded && !contracts.length && <div>No contracts</div>}
                        {!contractsLoaded && <ProjectContentLoader text="Fetching project contracts..."/>}
                    </Fragment>}
                    {!projectIsSetup && <ProjectSetupEmptyState project={project}/>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}} = ownProps;

    return {
        project: getProject(state, id),
        contracts: getContractsForProject(state, id),
        contractsLoaded: areProjectContractsLoaded(state, id),
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
)(ProjectContractsPage);
