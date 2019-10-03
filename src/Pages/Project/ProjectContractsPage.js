import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as contractActions from "../../Core/Contract/Contract.actions";

import {areProjectContractsLoaded, getProject} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {Container, Page, PageHeading, Panel, PanelContent, Button} from "../../Elements";
import {
    ProjectSetupEmptyState,
    ProjectContractList,
    ProjectContentLoader,
    ProjectSetupGuide,
    ExampleProjectInfoModal,
    EmptyState
} from "../../Components";
import NoContractsIcon from '../../Components/ProjectSetupEmptyState/no-contracts-watched.svg';
import {ProjectTypes} from "../../Common/constants";
import {Project} from "../../Core/models";

class ProjectContractsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createProjectModalOpen: false,
        };
    }

    async componentDidMount() {
        const {actions, project, contractsLoaded} = this.props;

        const projectIsSetup = !!project.lastPushAt;

        if (projectIsSetup && !contractsLoaded) {
            await actions.fetchContractsForProject(project);
        }
    }

    /**
     * @param {Contract} contract
     */
    handleContractListeningToggle = (contract) => {
        const {actions, project} = this.props;

        actions.toggleContractListening(project, contract.address, contract.network);
    };

    handleOpenExampleProjectInfoModal = () => {
        this.setState({
            createProjectModalOpen: true,
        });
    };

    handleCloseExampleProjectInfoModal = () => {
        this.setState({
            createProjectModalOpen: false,
        });
    };

    render() {
        const {project, contracts, contractsLoaded} = this.props;
        const {createProjectModalOpen} = this.state;

        const projectIsSetup = !!project.lastPushAt;

        return (
            <Page id="ProjectContractsPage">
                <Container>
                    <PageHeading>
                        <h1>Contracts</h1>
                        {projectIsSetup && <div className="RightContent">
                            {contractsLoaded && project.type !== ProjectTypes.DEMO && <ProjectSetupGuide project={project} label="Add Contract" outline={false}
                                                                   initialCancelButtonLabel="Cancel"/>}
                            {contractsLoaded && project.type === ProjectTypes.DEMO && <Fragment>
                                <Button onClick={this.handleOpenExampleProjectInfoModal}>
                                    <span>Add Contract</span>
                                </Button>
                                <ExampleProjectInfoModal header="Example Project" description="This is just an example project to illustrate what the platform can do. If you wish to add a contract first create a project." onClose={this.handleCloseExampleProjectInfoModal} open={createProjectModalOpen}/>
                            </Fragment>}
                        </div>}
                    </PageHeading>
                    {projectIsSetup && <Fragment>
                        {contractsLoaded && !!contracts.length && <ProjectContractList contracts={contracts} onListenToggle={this.handleContractListeningToggle}/>}
                        {contractsLoaded && !contracts.length && <Panel>
                            <PanelContent>
                                <EmptyState image={NoContractsIcon} title="No contracts watched"
                                            description="There are no contracts added to this project. Add contracts to start monitoring them."/>
                            </PanelContent>
                        </Panel>}
                        {!contractsLoaded && <ProjectContentLoader text="Fetching project contracts..."/>}
                    </Fragment>}
                    {!projectIsSetup && <ProjectSetupEmptyState project={project}/>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {slug, username}}} = ownProps;

    const projectId = Project.generateProjectId(slug, username);

    return {
        project: getProject(state, projectId),
        contracts: getContractsForProject(state, projectId),
        contractsLoaded: areProjectContractsLoaded(state, projectId),
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
