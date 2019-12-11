import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {CollaboratorPermissionTypes, ProjectTypes} from "../../Common/constants";
import {contractActions} from "../../Core/actions";

import {
    areProjectContractsLoaded,
    getProjectBySlugAndUsername
} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject, getTagsForProjectContracts} from "../../Common/Selectors/ContractSelectors";

import {Container, Page, PageHeading, Panel, PanelContent, Button} from "../../Elements";
import {
    ProjectSetupEmptyState,
    ProjectContractList,
    ProjectContentLoader,
    PermissionControl,
    ExampleProjectInfoModal,
    EmptyState
} from "../../Components";
import NoContractsIcon from '../../Components/ProjectSetupEmptyState/no-contracts-watched.svg';

class ProjectContractsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createProjectModalOpen: false,
        };
    }

    async componentDidMount() {
        const {actions, project, contractsLoaded} = this.props;

        if (!contractsLoaded) {
            await actions.fetchContractsForProject(project);
        }
    }

    /**
     * @param {Contract} contract
     */
    handleContractListeningToggle = (contract) => {
        const {actions, project} = this.props;

        actions.toggleContractListening(project, contract);
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
        const {project, contracts, contractsLoaded, contractTags} = this.props;
        const {createProjectModalOpen} = this.state;

        const projectIsSetup = contracts.length > 0;

        return (
            <Page id="ProjectContractsPage">
                <Container>
                    <PageHeading>
                        <h1>Contracts</h1>
                        {projectIsSetup && <div className="RightContent">
                            {contractsLoaded && project.type !== ProjectTypes.DEMO &&
                            <PermissionControl project={project}
                                               requiredPermission={CollaboratorPermissionTypes.ADD_CONTRACT}>
                                <Button to={`${project.getUrlBase()}/contracts/add`}>
                                    <span>Add Contract</span>
                                </Button>
                            </PermissionControl>}
                            {contractsLoaded && project.type === ProjectTypes.DEMO && <Fragment>
                                <Button onClick={this.handleOpenExampleProjectInfoModal}>
                                    <span>Add Contract</span>
                                </Button>
                                <ExampleProjectInfoModal header="Example Project" description="This is just an example project to illustrate what the platform can do. If you wish to add a contract first create a project." onClose={this.handleCloseExampleProjectInfoModal} open={createProjectModalOpen}/>
                            </Fragment>}
                        </div>}
                    </PageHeading>
                    {projectIsSetup && <Fragment>
                        {contractsLoaded && !!contracts.length && <ProjectContractList contracts={contracts} contractTags={contractTags} onListenToggle={this.handleContractListeningToggle}/>}
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

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        project,
        contracts: getContractsForProject(state, project.id),
        contractTags: getTagsForProjectContracts(state, project),
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
)(ProjectContractsPage);
