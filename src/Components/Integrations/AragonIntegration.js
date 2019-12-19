import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Blockies from "react-blockies";
import {Redirect} from "react-router-dom";

import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";

import {getNetworkForApiId} from "../../Utils/NetworkHelpers";

import {Contract} from "../../Core/models";
import {projectActions, contractActions} from "../../Core/actions";

import {Button, Container, Icon, Card, LinkButton, Input} from "../../Elements";
import {ProjectSelect, SimpleLoader} from "../index";

import AragonLogo from './Logos/aragon_icon.svg';

import './AragonIntegration.scss';

class AragonIntegration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null,
            projectName: '',
            createProjectMode: false,
            contractsStatus: {},
            contractsErrors: {},
            syncFinished: false,
        };
    }

    async componentDidMount() {
        const {data, projectActions, projects, usernameSet, areProjectsLoaded} = this.props;

        if (!areProjectsLoaded && usernameSet) {
            const projectsResponse = await projectActions.fetchProjects('me');

            if (projectsResponse.success) {
                this.setState({
                    project: projectsResponse.data.find(p => p.slug === data.project),
                });
            }
        } else if (areProjectsLoaded) {
            this.setState({
                project: projects.find(p => p.slug === data.project),
            });
        }
    }

    handleProjectChange = (project) => {
        this.setState({
            project,
        });
    };

    toggleCreateProjectMode = () => {
        this.setState({
            createProjectMode: !this.state.createProjectMode,
            projectName: '',
        });
    };

    handleProjectNameChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    syncContractToProject = async (project, contractDetails) => {
        const {contractsStatus, contractsErrors} = this.state;
        const {projectActions, contractActions, data} = this.props;

        this.setState({
            contractsStatus: {
                ...contractsStatus,
                [contractDetails.address]: 'importing',
            },
        });

        const response = await projectActions.addVerifiedContractToProject(project, data.network, contractDetails.address);

        const errors = {};

        if (response.success) {
            await contractActions.changeContractNameByAddressAndNetwork(project, contractDetails.address, data.network, contractDetails.name);
        }

        let finalStatus = 'success';

        if (!response.success) {
            finalStatus = 'failed';
            errors[contractDetails.address] = response.data.error ? response.data.error.message : 'Failed syncing contract to Tenderly';
        }

        this.setState({
            contractsStatus: {
                ...contractsStatus,
                [contractDetails.address]: finalStatus,
            },
            contractsErrors: {
                ...contractsErrors,
                ...errors,
            },
        });

        return response.success;
    };

    handleProjectSync = async () => {
        const {data, projectActions, contractActions} = this.props;
        const {project, createProjectMode, projectName, contractsStatus} = this.state;

        let projectToSync = project;

        this.setState({
            importInProgress: true,
        });

        if (createProjectMode) {
            const projectResponse = await projectActions.createProject(projectName);

            if (!projectResponse.success) {
                return;
            }

            projectToSync = projectResponse.data;

            this.setState({
                createProjectMode: false,
                project: projectToSync,
            });
        }

        let allSuccessful = true;

        // For some reason eslint says that searchResult is not used
        // eslint-disable-next-line
        for (const contractDetails of data.contracts.filter(c => !contractsStatus[c.address] || contractsStatus[c.address] !== 'success')) {
            const addedSuccessfully = await this.syncContractToProject(projectToSync, contractDetails);

            if (!addedSuccessfully) {
                allSuccessful = false;
            }
        }

        await contractActions.fetchContractsForProject(projectToSync);

        this.setState({
            redirectToProject: allSuccessful,
            syncFinished: true,
            importInProgress: false,
        });
    };

    render() {
        const {data, areProjectsLoaded} = this.props;
        const {project, createProjectMode, redirectToProject, importInProgress, syncFinished, contractsStatus, contractsErrors, projectName} = this.state;

        if (redirectToProject) {
            return <Redirect to={project.getUrlBase()}/>
        }

        return (
            <Container>
                <div className="AragonIntegration">
                    <div className="AragonIntegration__Companies">
                        <div>
                            <img src={AragonLogo} width={120} alt=""/>
                        </div>
                    </div>
                    <h1 className="TextAlignCenter MarginBottom4">Sync contracts from Aragon</h1>
                    {areProjectsLoaded && <Card className="AragonIntegration__ProjectPicker">
                        <h3 className="AragonIntegration__ProjectPicker__Headline MarginBottom2">Select Project</h3>
                        {!createProjectMode && <Fragment>
                            <ProjectSelect value={project} disabled={importInProgress} onChange={this.handleProjectChange} className="MarginBottom2"/>
                            <LinkButton onClick={this.toggleCreateProjectMode}><Icon icon="plus"/> Create new project</LinkButton>
                        </Fragment>}
                        {createProjectMode && <Fragment>
                            <Input disabled={importInProgress} icon="project" label="Project Name" field="projectName" value={projectName} onChange={this.handleProjectNameChange} autoComplete="off" autoFocus/>
                            <LinkButton onClick={this.toggleCreateProjectMode}>Select existing project</LinkButton>
                        </Fragment>}
                    </Card>}
                    <hr className="AragonIntegration__Divider"/>
                    <Card className="AragonIntegration__Contracts">
                        <h3 className="AragonIntegration__Contracts__Headline MarginBottom2">Contracts to Sync</h3>
                        {data.contracts.map(contract => <div key={contract.address} className="AragonIntegration__Contracts__Item">
                            <div className="AragonIntegration__Contracts__Item__Icon">
                                <Blockies size={8} scale={5} className="BorderRadius2" seed={Contract.generateUniqueContractId(contract.address, getNetworkForApiId(data.network))}/>
                                {contractsStatus[contract.address] && <div className={`AragonIntegration__Contracts__Item__Icon__InProgress AragonIntegration__Contracts__Item__Icon__InProgress--${contractsStatus[contract.address]}`}>
                                    {contractsStatus[contract.address] === 'importing' && <SimpleLoader inverse/>}
                                    {contractsStatus[contract.address] === 'success' && <Icon icon="check"/>}
                                    {contractsStatus[contract.address] === 'failed' && <Icon icon="x-circle"/>}
                                </div>}
                            </div>
                            <div className="AragonIntegration__Contracts__Item__Info">
                                <div className="AragonIntegration__Contracts__Item__Name">{contract.name}</div>
                                <div className="AragonIntegration__Contracts__Item__Address">{contract.address}</div>
                                {contractsStatus[contract.address] === 'failed' && <div className="DangerText">
                                    {contractsErrors[contract.address]}
                                </div>}
                            </div>
                        </div>)}
                    </Card>
                    <hr className="AragonIntegration__Divider"/>
                    {!syncFinished && <div>
                        <Button color="secondary" disabled={!project || importInProgress} onClick={this.handleProjectSync}>
                            <span>Sync Project</span>
                        </Button>
                        <Button color="secondary" outline to="/">
                            <span>Cancel</span>
                        </Button>
                    </div>}
                    {syncFinished && <div>
                        {!!project && <Button color="secondary" disabled={!project} to={project.getUrlBase()}>
                            <span>Go to Project</span>
                        </Button>}
                        <Button color="secondary" outline onClick={this.handleProjectSync}>
                            <span>Retry Sync</span>
                        </Button>
                    </div>}
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        areProjectsLoaded: state.project.projectsLoaded,
        usernameSet: state.auth.usernameSet,
        projects: getDashboardProjects(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        projectActions: bindActionCreators(projectActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AragonIntegration);
