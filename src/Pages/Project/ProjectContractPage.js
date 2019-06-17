import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";

import * as contractActions from "../../Core/Contract/Contract.actions";

import {getContractById, getContractStatus} from "../../Common/Selectors/ContractSelectors";
import {EntityStatusTypes, NetworkRouteToAppTypeMap} from "../../Common/constants";

import {Page, Container, PageHeading, Button, Icon} from "../../Elements";
import {
    ContractInformation,
    ContractDeploymentInformation,
    ProjectContentLoader,
    ContractFiles,
} from "../../Components";

class ProjectContractPage extends Component {
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

    render() {
        const {contract, contractStatus, projectId} = this.props;

        if (contractStatus === EntityStatusTypes.NON_EXISTING) {
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
                        </PageHeading>
                        <ContractInformation contract={contract}/>
                        <ContractDeploymentInformation contract={contract}/>
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
