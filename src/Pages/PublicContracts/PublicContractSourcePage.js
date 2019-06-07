import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import qs from "qs";

import * as publicContractsActions from "../../Core/PublicContracts/PublicContracts.actions";

import {getPublicContractById, isPublicContractLoaded} from "../../Common/Selectors/PublicContractSelectors";

import {NetworkApiToAppTypeMap} from "../../Common/constants";

import {Page, Container} from "../../Elements";
import {ContractInformation, ContractFileSource} from "../../Components";

class PublicContractSourcePage extends Component {
    componentDidMount() {
        const {contract, contractLoaded, networkType, actions, match: {params: { id }}} = this.props;

        if (!contract || !contractLoaded) {
            actions.fetchPublicContract(id, networkType);
        }
    }
    render() {
        const {contract, location: {search}} = this.props;

        const parsedQuery = qs.parse(search, { ignoreQueryPrefix: true });
        const line = parseInt(parsedQuery["line"], 10) || null;

        if (!contract) {
            return (
                <Page>
                    Fetching data...
                </Page>
            )
        }

        return (
            <Page>
                <Container>
                    <ContractInformation contract={contract} back/>
                    <ContractFileSource file={contract.mainFile} line={line}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: { id, network }}} = ownProps;

    const networkType = NetworkApiToAppTypeMap[network];

    return {
        contract: getPublicContractById(state, id),
        contractLoaded: isPublicContractLoaded(state, id),
        networkType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(publicContractsActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicContractSourcePage);
