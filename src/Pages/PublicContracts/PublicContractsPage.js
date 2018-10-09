import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {NetworkApiToAppTypeMap, NetworkRouteTypes} from "../../Common/constants";
import {getNetworkPublicContractsForPage} from "../../Common/Selectors/PublicContractSelectors";

import * as publicContractsActions from '../../Core/PublicContracts/PublicContracts.actions';

import {Page, Container} from "../../Elements";
import {PublicContractList, PublicContractsSwitcher} from "../../Components";

class PublicContractsPage extends Component {
    /**
     * @param {string} network
     */
    getNetworkPublicContracts(network) {
        const {actions} = this.props;

        actions.fetchPublicContracts(network, 0, '');
    }

    componentDidMount() {
        const {networkType} = this.props;

        if (networkType) {
            this.getNetworkPublicContracts(networkType);
        }
    }

    componentDidUpdate(prevProps) {
        const {networkType} = this.props;

        if (networkType && networkType !== prevProps.networkType) {
            this.getNetworkPublicContracts(networkType);
        }
    }

    render() {
        const {contracts, networkType, match: {params: { network }}} = this.props;

        if (!networkType) {
            return (
                <Redirect to={`/public-contracts/${NetworkRouteTypes.MAIN}`}/>
            )
        }

        return (
            <Page>
                <Container>
                    <div>
                        <PublicContractsSwitcher active={network}/>
                    </div>
                    <PublicContractList contracts={contracts}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: { network }}} = ownProps;

    const networkType = NetworkApiToAppTypeMap[network];

    return {
        contracts: getNetworkPublicContractsForPage(state, networkType, 0),
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
)(PublicContractsPage);
