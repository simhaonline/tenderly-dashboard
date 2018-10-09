import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as publicContractsActions from "../../Core/PublicContracts/PublicContracts.actions";

import {Page} from "../../Elements";
import {NetworkApiToAppTypeMap} from "../../Common/constants";
import {getPublicContractById, isPublicContractLoaded} from "../../Common/Selectors/PublicContractSelectors";
import {getPublicContractEvent} from "../../Common/Selectors/EventSelectors";

class ErrorPage extends Component {
    render() {
        const {event, contract, redirectNetwork, redirectId} = this.props;

        console.log(event, contract);

        if (!contract) {
            return <Redirect to={`/contract/${redirectNetwork}/${redirectId}`}/>;
        }

        return (
            <Page>
                ErrorPage
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: { id, network, errorId }}} = ownProps;

    const networkType = NetworkApiToAppTypeMap[network];

    return {
        contract: getPublicContractById(state, id),
        contractLoaded: isPublicContractLoaded(state, id),
        event: getPublicContractEvent(state, errorId, id, networkType),
        redirectNetwork: network,
        redirectId: id,
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
