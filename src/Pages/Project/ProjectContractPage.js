import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {bindActionCreators} from "redux";

import {getNetworkForRouteSlug} from "../../Utils/RouterHelpers";

import {
    getProjectBySlugAndUsername,
    getProjectContractForRevision
} from "../../Common/Selectors/ProjectSelectors";
import {
    getContractByAddressAndNetwork, getContractRevisionsForProjectContract,
    getContractStatus,
    getContractTagsByAddressAndNetwork
} from "../../Common/Selectors/ContractSelectors";
import {EntityStatusTypes, EtherscanLinkTypes} from "../../Common/constants";

import * as contractActions from "../../Core/Contract/Contract.actions";

import {Page, Container, PageHeading, Button, Icon} from "../../Elements";
import {
    ContractInformation,
    ProjectContentLoader,
    ProjectContractActions,
    ContractFiles, EtherscanLink,
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
        const {contractStatus, networkType, contractAddress, actions, project} = this.props;

        if (contractStatus !== EntityStatusTypes.LOADED) {
            actions.fetchContractForProject(project, contractAddress, networkType);
        }
    }

    /**
     * @return {boolean}
     */
    isContractLoaded = () => {
        const {contractStatus} = this.props;

        return contractStatus === EntityStatusTypes.LOADED;
    };

    /**
     * @param {Contract} contract
     */
    handleContractListeningToggle = (contract) => {
        const {actions, project} = this.props;

        actions.toggleContractListening(project, contract);
    };

    /**
     * @param {Contract} contract
     */
    handleContractDelete = async (contract) => {
        const {actions, project} = this.props;

        const response = await actions.deleteContract(project, contract.address, contract.network);

        if (response.success) {
            this.setState({
                contractRemoved: true,
            });
        }
    };

    handleContractAction = (actionType) => {

    };

    render() {
        const {contract, contractTags, contractStatus, project} = this.props;
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
                            <h1>{contract.name}</h1>
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
                                <ContractInformation contract={contract} tags={contractTags} project={project} onDelete={this.handleContractDelete}
                                                     onListenToggle={this.handleContractListeningToggle}/>
                                 <ProjectContractActions onAction={this.handleContractAction}/>
                            </Fragment>}/>
                            <Route path="/:username/:slug/contract/:network/:address/files" exact render={() => <ContractFiles contract={contract}/>}/>
                            <Route path="/:username/:slug/contract/:network/:address/revisions" exact render={() => null}/>
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
    const projectContract = getProjectContractForRevision(state, project.id, contract);

    return {
        networkType,
        contractAddress: address,
        project,
        contract,
        revisions: getContractRevisionsForProjectContract(state, project.id, projectContract),
        contractTags: getContractTagsByAddressAndNetwork(state, project, address, networkType),
        contractStatus: getContractStatus(state, address, networkType),
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
