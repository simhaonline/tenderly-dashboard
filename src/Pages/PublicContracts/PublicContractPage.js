import React, {Component} from "react";
import {connect} from "react-redux";

import {Page} from "../../Elements";
import {getPublicContractById, isPublicContractLoaded} from "../../Common/Selectors/PublicContractSelectors";
import {bindActionCreators} from "redux";
import * as publicContractsActions from "../../Core/PublicContracts/PublicContracts.actions";
import {NetworkApiToAppTypeMap} from "../../Common/constants";

class PublicContractPage extends Component {
    componentDidMount() {
        const {contract, loaded, actions, match: {params: { id, network }}} = this.props;

        const networkType = NetworkApiToAppTypeMap[network];

        if (!contract || !loaded) {
            actions.fetchPublicContract(id, networkType);
        }
    }
    render() {
        const {contract} = this.props;

        if (!contract) {
            return (
                <Page>
                    Fetching data...
                </Page>
            )
        }

        return (
            <Page>
                {contract.name}
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: { id }}} = ownProps;

    return {
        contract: getPublicContractById(state, id),
        loaded: isPublicContractLoaded(state, id),
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
)(PublicContractPage);
