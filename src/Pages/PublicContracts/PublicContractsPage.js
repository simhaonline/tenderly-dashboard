import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { Helmet } from "react-helmet";

import {NetworkLabelMap, NetworkRouteToAppTypeMap, NetworkRouteTypes} from "../../Common/constants";
import {getNetworkPublicContractsForPage} from "../../Common/Selectors/PublicContractSelectors";

import * as publicContractsActions from '../../Core/PublicContracts/PublicContracts.actions';

import {Page, Container} from "../../Elements";
import {PublicContractList, PublicContractsInfo} from "../../Components";

class PublicContractsPage extends Component {
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

    /**
     * @param {string} network
     */
    getNetworkPublicContracts(network) {
        const {actions} = this.props;

        actions.fetchPublicContracts(network, 0, '');
    }

    /**
     * @param {string} contractAddress
     */
    handleContractSearch = (contractAddress) => {
        console.log('search this', contractAddress);
    };

    /**
     * @param {string} network
     */
    handleNetworkChange = (network) => {
        console.log('network change', network)
    };

    render() {
        const {contracts, networkType} = this.props;

        if (!networkType) {
            return (
                <Redirect to={`/public-contracts/${NetworkRouteTypes.MAIN}`}/>
            )
        }

        return (
            <Page>
                <Helmet>
                    <title>Public Contracts | Tenderly</title>
                    <meta name="description" content="Free Web tutorials"/>
                    <meta name="keywords" content={`smart contracts, ${NetworkLabelMap[networkType].toLowerCase()}, publi\c contracts, verified contracts`}/>
                </Helmet>
                <Container>
                    <PublicContractsInfo network={networkType}
                                         onSearch={this.handleContractSearch}
                                         onNetworkChange={this.handleNetworkChange}/>
                    <PublicContractList contracts={contracts}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: { network }}} = ownProps;

    let networkType = NetworkRouteToAppTypeMap[network];

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
