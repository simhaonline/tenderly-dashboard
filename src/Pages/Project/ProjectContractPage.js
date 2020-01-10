import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {bindActionCreators} from "redux";

import {getNetworkForRouteSlug} from "../../Utils/RouterHelpers";

import {
    areProjectContractsLoaded,
    getProjectBySlugAndUsername,
    getProjectContractForRevision
} from "../../Common/Selectors/ProjectSelectors";
import {
    getContractByAddressAndNetwork, getContractRevisionsForProjectContract,
    getContractStatus,
} from "../../Common/Selectors/ContractSelectors";
import {EntityStatusTypes, EtherscanLinkTypes, ProjectTypes} from "../../Common/constants";

import * as contractActions from "../../Core/Contract/Contract.actions";

import {Page, Container, PageHeading, Button, Icon} from "../../Elements";
import {
    ContractInformation,
    ProjectContentLoader,
    ProjectContractActions,
    ContractFiles, EtherscanLink, ContractRevisions,
} from "../../Components";

class ProjectContractPage extends Component {
    constructor(props) {
        super(props);

        const {project, match: {params: {address, network}}} = props;

        this.state = {
            contractRemoved: false,
            tabs: [
                {
                    route: `${project.getUrlBase()}/contract/${network}/${address}`,
                    label: 'General',
                },
                {
                    route: `${project.getUrlBase()}/contract/${network}/${address}/files`,
                    label: 'Files',
                },
                {
                    route: `${project.getUrlBase()}/contract/${network}/${address}/revisions`,
                    label: 'Revisions',
                },
            ],
        };
    }

    componentDidMount() {
        const {contractStatus, contractsLoaded, networkType, contractAddress, actions, project} = this.props;

        if (contractStatus !== EntityStatusTypes.LOADED && project.type !== ProjectTypes.DEMO) {
            actions.fetchContractForProject(project, contractAddress, networkType);
        }

        if (!contractsLoaded) {
            actions.fetchContractsForProject(project);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {contractStatus, networkType, contractAddress, actions, project, match: {params: {address, network}}} = this.props;

        if (contractAddress !== prevProps.contractAddress) {
            this.setState({
                tabs: [
                    {
                        route: `${project.getUrlBase()}/contract/${network}/${address}`,
                        label: 'General',
                    },
                    {
                        route: `${project.getUrlBase()}/contract/${network}/${address}/files`,
                        label: 'Files',
                    },
                    {
                        route: `${project.getUrlBase()}/contract/${network}/${address}/revisions`,
                        label: 'Revisions',
                    },
                ],
            });

            if (contractStatus !== EntityStatusTypes.LOADED) {
                actions.fetchContractForProject(project, contractAddress, networkType);
            }
        }
    }

    /**
     * @return {boolean}
     */
    isContractLoaded = () => {
        const {contractStatus, project} = this.props;

        return contractStatus === EntityStatusTypes.LOADED || project.type === ProjectTypes.DEMO;
    };

    /**
     * @param {ProjectContractRevision} revision
     */
    handleContractListeningToggle = async (revision) => {
        const {actions, project, projectContract} = this.props;

        await actions.toggleContractListening(project, projectContract, revision);
    };

    /**
     * @param {ProjectContractRevision} revision
     */
    handleContractDelete = async (revision) => {
        const {actions, project} = this.props;

        actions.deleteContract(project, revision);

            this.setState({
                contractRemoved: true,
            });
    };

    handleContractAction = async (action) => {
        const {projectContract} = this.props;

        switch (action.type) {
            case 'toggle_contract':
                const revision = projectContract.getRevision(action.contract.id);
                await this.handleContractListeningToggle(revision);
                break;
            case 'delete_contract':
                await this.handleContractDelete(action.contract);
                break;
        }

    };

    render() {
        const {contract, projectContract, revisions, contractStatus, project} = this.props;
        const {contractRemoved, tabs} = this.state;

        if (contractStatus === EntityStatusTypes.NON_EXISTING || contractRemoved) {
            return <Redirect to={`/${project.owner}/${project.slug}/contracts`}/>
        }

        const isContractFetched = this.isContractLoaded();

        return (
            <Page tabs={tabs}>
                <Container>
                    {!isContractFetched && <ProjectContentLoader text="Fetching contract..."/>}
                    {isContractFetched && <Fragment>
                        <PageHeading>
                            <Button outline to={`/${project.owner}/${project.slug}/contracts`}>
                                <Icon icon="arrow-left"/>
                            </Button>
                            <h1>{projectContract.name}</h1>
                            <div className="RightContent">
                                <EtherscanLink type={EtherscanLinkTypes.ADDRESS} network={contract.network} value={contract.address}>
                                    <Button size="small" outline>
                                        <Icon icon="globe"/>
                                        <span>View in Explorer</span>
                                    </Button>
                                </EtherscanLink>
                            </div>
                        </PageHeading>
                        <Switch>
                            <Route path="/:username/:slug/contract/:network/:address" exact render={() => <Fragment>
                                <ContractInformation contract={contract} projectContract={projectContract} project={project}/>
                                <ProjectContractActions onAction={this.handleContractAction} project={project} contract={contract} projectContract={projectContract} />
                            </Fragment>}/>
                            <Route path="/:username/:slug/contract/:network/:address/files" exact render={() => <ContractFiles contract={contract}/>}/>
                            <Route path="/:username/:slug/contract/:network/:address/revisions" exact render={() => <ContractRevisions projectContract={projectContract} currentContract={contract} contracts={revisions} onDelete={this.handleContractDelete}
                                                                                                                                       onListenToggle={this.handleContractListeningToggle}/>}/>
                        </Switch>
                    </Fragment>}
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug, address, network}}} = ownProps;

    const networkType = getNetworkForRouteSlug(network);

    const project = getProjectBySlugAndUsername(state, slug, username);
    const contract = getContractByAddressAndNetwork(state, address, networkType);
    const projectContract = getProjectContractForRevision(state, project.id, contract ? contract.id: null);

    return {
        networkType,
        contractAddress: address,
        project,
        contract,
        projectContract,
        revisions: getContractRevisionsForProjectContract(state, project.id, projectContract),
        contractStatus: getContractStatus(state, address, networkType),
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
)(ProjectContractPage);
