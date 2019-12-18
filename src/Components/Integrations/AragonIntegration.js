import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Blockies from "react-blockies";

import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";

import {getNetworkForApiId} from "../../Utils/NetworkHelpers";

import {Contract} from "../../Core/models";
import {projectActions, contractActions} from "../../Core/actions";

import {Button, Container, Icon, Card, LinkButton, Input} from "../../Elements";
import {ProjectSelect, TenderlyLogo} from "../index";

import AragonLogo from './Logos/aragon_icon.svg';

import './AragonIntegration.scss';

class AragonIntegration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null,
            projectName: '',
            createProjectMode: false,
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
        const {selectedContractsStatus} = this.state;
        const {projectActions, contractActions, data} = this.props;

        this.setState({
            selectedContractsStatus: {
                ...selectedContractsStatus,
                [contractDetails.address]: 'importing',
            },
        });

        const response = await projectActions.addVerifiedContractToProject(project, data.network, contractDetails.address);

        let renameResponse;

        if (response.success) {
            renameResponse = await contractActions.changeContractNameByAddressAndNetwork(project, contractDetails.address, data.network, contractDetails.name);
        }

        console.log(renameResponse);

        let finalStatus = 'success';

        if (!response.success) {
            finalStatus = 'failed';
        }

        this.setState({
            selectedContractsStatus: {
                ...selectedContractsStatus,
                [contractDetails.address]: finalStatus,
            },
        });

        return response.success;
    };

    handleProjectSync = async () => {
        const {data, contractActions} = this.props;
        const {project} = this.state;

        let allSuccessful = true;

        this.setState({
            importInProgress: true,
        });

        // For some reason eslint says that searchResult is not used
        // eslint-disable-next-line
        for (const contractDetails of data.contracts) {
            const addedSuccessfully = await this.syncContractToProject(project, contractDetails);

            if (!addedSuccessfully) {
                allSuccessful = false;
            }
        }

        await contractActions.fetchContractsForProject(project);

        this.setState({
            redirectBack: allSuccessful,
            importInProgress: false,
        });
    };

    render() {
        const {data, areProjectsLoaded} = this.props;
        const {project, createProjectMode, projectName} = this.state;

        return (
            <Container>
                <div className="AragonIntegration">
                    <div className="AragonIntegration__Companies">
                        <div>
                            <img src={AragonLogo} width={120} alt=""/>
                        </div>
                        <Icon icon="refresh-cw" className="AragonIntegration__Companies__SyncIcon"/>
                        <div>
                            <TenderlyLogo width={80} symbol/>
                        </div>
                    </div>
                    <h1 className="TextAlignCenter MarginBottom4">Sync contracts from Aragon</h1>
                    {areProjectsLoaded && <Card className="AragonIntegration__ProjectPicker">
                        <h3 className="AragonIntegration__ProjectPicker__Headline MarginBottom2">Select Project</h3>
                        {!createProjectMode && <Fragment>
                            <ProjectSelect value={project} onChange={this.handleProjectChange} className="MarginBottom2"/>
                            <LinkButton onClick={this.toggleCreateProjectMode}><Icon icon="plus"/> Create new project</LinkButton>
                        </Fragment>}
                        {createProjectMode && <Fragment>
                            <Input icon="project" label="Project Name" field="projectName" value={projectName} onChange={this.handleProjectNameChange} autoComplete="off" autoFocus/>
                            <LinkButton onClick={this.toggleCreateProjectMode}>Select existing project</LinkButton>
                        </Fragment>}
                    </Card>}
                    <hr className="AragonIntegration__Divider"/>
                    <Card className="AragonIntegration__Contracts">
                        <h3 className="AragonIntegration__Contracts__Headline MarginBottom2">Contracts to Sync</h3>
                        {data.contracts.map(contract => <div key={contract.address} className="AragonIntegration__Contracts__Item">
                            <Blockies size={8} scale={5} className="BorderRadius2" seed={Contract.generateUniqueContractId(contract.address, getNetworkForApiId(data.network))}/>
                            <div className="AragonIntegration__Contracts__Item__Info">
                                <div className="AragonIntegration__Contracts__Item__Name">{contract.name}</div>
                                <div className="AragonIntegration__Contracts__Item__Address">{contract.address}</div>
                            </div>
                        </div>)}
                    </Card>
                    <hr className="AragonIntegration__Divider"/>
                    <div>
                        <Button color="secondary" disabled={!project } onClick={this.handleProjectSync}>
                            <span>Sync Project</span>
                        </Button>
                        <Button color="secondary" outline to="/">
                            <span>Cancel</span>
                        </Button>
                    </div>
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
