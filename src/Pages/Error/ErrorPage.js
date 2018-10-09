import React, {Component} from "react";

import {Page} from "../../Elements";
import {NetworkApiToAppTypeMap} from "../../Common/constants";
import {getPublicContractById, isPublicContractLoaded} from "../../Common/Selectors/PublicContractSelectors";
import {getPublicContractEvents} from "../../Common/Selectors/EventSelectors";
import {bindActionCreators} from "redux";
import * as publicContractsActions from "../../Core/PublicContracts/PublicContracts.actions";
import connect from "react-redux/es/connect/connect";

class ErrorPage extends Component {
    render() {
        return (
            <Page>
                ErrorPage
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
        event: getPublicContractEvents(state, id, networkType),
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
)(ErrorPage);
