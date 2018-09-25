import React, {Component} from "react";
import {connect} from "react-redux";

import {Page} from "../../Elements";
import {getPublicContractById} from "../../Common/Selectors/PublicContractSelectors";
import {bindActionCreators} from "redux";
import * as publicContractsActions from "../../Core/PublicContracts/PublicContracts.actions";

class PublicContractPage extends Component {
    componentDidMount() {
        const {contract, actions, match: {params: { id }}} = this.props;

        if (!contract) {
            actions.fetchPublicContract(id);
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
