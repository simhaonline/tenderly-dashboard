import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {getContractById, getContractStatus} from "../../Common/Selectors/ContractSelectors";
import {EntityStatusTypes, NetworkRouteToAppTypeMap} from "../../Common/constants";

import {Page, Container} from "../../Elements";
import {
    ContractInformation,
    ContractDeploymentInformation,
    ProjectContentLoader,
    ContractFiles,
} from "../../Components";

class ProjectContractPage extends Component {
    componentDidMount() {
        const {contractStatus} = this.props;

        if (contractStatus === EntityStatusTypes.NOT_LOADED) {

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
        projectId: id,
        contract: getContractById(state, contractId),
        contractStatus: getContractStatus(state, contractId),
    }
};

export default connect(
    mapStateToProps,
    null,
)(ProjectContractPage);
