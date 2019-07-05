import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";

import * as contractActions from "../../Core/Contract/Contract.actions";

import {getContractById, getContractStatus} from "../../Common/Selectors/ContractSelectors";
import {EntityStatusTypes, EtherscanLinkTypes, NetworkRouteToAppTypeMap} from "../../Common/constants";

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
        const {contractStatus, networkType, contractId, actions, projectId} = this.props;

        if (contractStatus === EntityStatusTypes.NOT_LOADED) {
            actions.fetchContractForProject(projectId, contractId, networkType);
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
        const {actions} = this.props;

        actions.toggleContractListening(contract.projectId, contract.address, contract.network);
    };

    /**
     * @param {Contract} contract
     */
    handleContractDelete = async (contract) => {
        const {actions} = this.props;

        const response = await actions.deleteContract(contract.projectId, contract.address, contract.network);

        if (response.success) {
            this.setState({
                contractRemoved: true,
            });
        }
    };

    render() {
        const {contract, contractStatus, projectId} = this.props;
        const {contractRemoved} = this.state;

        if (contractStatus === EntityStatusTypes.NON_EXISTING || contractRemoved) {
            return <Redirect to={`/project/${projectId}/contracts`}/>
        }

        const isContractFetched = this.isContractLoaded();

        return (
            <Page>
                <Container>
                    {!isContractFetched && <ProjectContentLoader text="Fetching contract..."/>}
                    {isContractFetched && <Fragment>
                        <PageHeading>
                            <Button outline to={`/project/${projectId}/contracts`}>
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
                        <ContractInformation contract={contract} onDelete={this.handleContractDelete}
                                             onListenToggle={this.handleContractListeningToggle}/>
                        <ContractFiles contract={contract}/>
                    </Fragment>}
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id, contractId, network}}} = ownProps;

    const networkType = NetworkRouteToAppTypeMap[network];

    return {
        networkType,
        contractId,
        projectId: id,
        contract: getContractById(state, contractId),
        contractStatus: getContractStatus(state, contractId),
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
