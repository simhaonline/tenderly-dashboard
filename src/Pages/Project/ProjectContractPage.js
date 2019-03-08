import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {getContractById, getContractStatus} from "../../Common/Selectors/ContractSelectors";

import {Page, Container, Card, CardHeading} from "../../Elements";
import {
    ContractInformation,
    ContractSource,
    ContractDeploymentInformation,
    ProjectContentLoader
} from "../../Components";
import {EntityStatusTypes} from "../../Common/constants";

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
                        <Card>
                            <CardHeading>
                                <h3>Source Code</h3>
                            </CardHeading>
                            <ContractSource contract={contract}/>
                        </Card>
                    </Fragment>}
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id, contractId}}} = ownProps;

    return {
        projectId: id,
        contract: getContractById(state, contractId),
        contractStatus: getContractStatus(state, contractId),
    }
};

export default connect(
    mapStateToProps,
    null,
)(ProjectContractPage);
