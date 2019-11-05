import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";

import {getNetworkForRouteSlug} from "../../Utils/RouterHelpers";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {
    getContractByAddressAndNetwork,
    getContractStatus,
    getContractTagsByAddressAndNetwork
} from "../../Common/Selectors/ContractSelectors";
import {EntityStatusTypes, EtherscanLinkTypes} from "../../Common/constants";

import * as contractActions from "../../Core/Contract/Contract.actions";

import {Page, Container, PageHeading, Button, Icon} from "../../Elements";
import {
    ContractInformation,
    ProjectContentLoader,
    ContractFiles, EtherscanLink,
} from "../../Components";

class ProjectContractPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contractRemoved: false,
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

    render() {
        const {contract, contractTags, contractStatus, project} = this.props;
        const {contractRemoved} = this.state;

        if (contractStatus === EntityStatusTypes.NON_EXISTING || contractRemoved) {
            return <Redirect to={`/${project.owner}/${project.slug}/contracts`}/>
        }

        const isContractFetched = this.isContractLoaded();

        return (
            <Page>
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
                        <ContractInformation contract={contract} tags={contractTags} project={project} onDelete={this.handleContractDelete}
                                             onListenToggle={this.handleContractListeningToggle}/>
                        <ContractFiles contract={contract}/>
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

    return {
        networkType,
        contractAddress: address,
        project,
        contract: getContractByAddressAndNetwork(state, address, networkType),
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
