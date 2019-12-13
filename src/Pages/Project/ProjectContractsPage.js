import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {CollaboratorPermissionTypes, PlanUsageTypes, ProjectTypes} from "../../Common/constants";
import {contractActions} from "../../Core/actions";

import {
    areProjectContractsLoaded, getMainProjectContracts,
    getProjectBySlugAndUsername
} from "../../Common/Selectors/ProjectSelectors";
import {getAccountPlanForProject} from "../../Common/Selectors/BillingSelectors";

import {Container, Page, PageHeading, Button, Icon} from "../../Elements";
import {
    ProjectSetupEmptyState,
    ProjectContractList,
    ProjectContentLoader,
    PermissionControl,
    ExampleProjectInfoModal,
    PaidFeatureButton,
} from "../../Components";

class ProjectContractsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createProjectModalOpen: false,
            fetchingContracts: false,
        };
    }

    async componentDidMount() {
        const {actions, project, contractsLoaded} = this.props;

        if (!contractsLoaded) {
            await actions.fetchContractsForProject(project);
        }
    }

    fetchContractsForProject = async () => {
        const {actions, project} = this.props;

        this.setState({
            fetchingContracts: true,
        });

        await actions.fetchContractsForProject(project);

        this.setState({
            fetchingContracts: false,
        });
    };

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
        const {project, contractsLoaded, projectContracts, accountPlan} = this.props;
        const {createProjectModalOpen, fetchingContracts} = this.state;

        const projectIsSetup = projectContracts.length > 0;

        return (
            <Page id="ProjectContractsPage">
                <Container>
                    <PageHeading>
                        <h1>Contracts</h1>
                        {projectIsSetup && <div className="RightContent">
                            {contractsLoaded && <Button outline disabled={fetchingContracts} onClick={this.fetchContractsForProject}>
                                <Icon icon="refresh-cw"/>
                                <span>Refresh</span>
                            </Button>}
                            {contractsLoaded && project.type !== ProjectTypes.DEMO &&
                            <PermissionControl project={project}
                                               requiredPermission={CollaboratorPermissionTypes.ADD_CONTRACT}>
                                <PaidFeatureButton usage={PlanUsageTypes.ADDRESS_USAGE} plan={accountPlan} to={`${project.getUrlBase()}/contracts/add`}>
                                    <span>Add Contract</span>
                                </PaidFeatureButton>
                            </PermissionControl>}
                            {contractsLoaded && project.type === ProjectTypes.DEMO && <Fragment>
                                <Button onClick={this.handleOpenExampleProjectInfoModal}>
                                    <span>Add Contract</span>
                                </Button>
                                <ExampleProjectInfoModal header="Example Project" description="This is just an example project to illustrate what the platform can do. If you wish to add a contract first create a project." onClose={this.handleCloseExampleProjectInfoModal} open={createProjectModalOpen}/>
                            </Fragment>}
                        </div>}
                    </PageHeading>
                    {!contractsLoaded && <ProjectContentLoader text="Fetching project contracts..."/>}
                    {contractsLoaded && projectIsSetup && <ProjectContractList projectContracts={projectContracts} onListenToggle={this.handleContractListeningToggle} project={project}/>}
                    {contractsLoaded && !projectIsSetup && <ProjectSetupEmptyState project={project}/>}
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
        accountPlan: getAccountPlanForProject(state, project),
        projectContracts: getMainProjectContracts(state, project.id),
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
