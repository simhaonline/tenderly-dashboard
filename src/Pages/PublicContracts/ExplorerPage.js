import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";

import Analytics from "../../Utils/Analytics";
import {getNetworkForRouteSlug} from "../../Utils/RouterHelpers";

import {NetworkTypes} from "../../Common/constants";
import {getNetworkPublicContractsForPage} from "../../Common/Selectors/PublicContractSelectors";

import * as publicContractsActions from '../../Core/PublicContracts/PublicContracts.actions';

import {Page, Container} from "../../Elements";
import {PublicNetworksSearch, TenderlyLogo, ExplorerDescription, ExplorerHeader} from "../../Components";

class ExplorerPage extends Component {
    async componentDidMount() {
        Analytics.page('Loaded Explore Page');
    }

    getNetworkPublicContracts = async () => {
        const {page, network} = this.state;
        const {actions} = this.props;

        this.setState({
            fetchingPublicContracts: true,
        });

        const response = await actions.fetchPublicContracts(network, page, 20);

        this.setState({
            fetchingPublicContracts: false,
            networkPublicContracts: response.data,
        });
    };

    handlePageChange = (nextPage) => {
        this.setState({
            page: nextPage,
        }, () => {
            this.getNetworkPublicContracts();
        });
    };

    /**
     * @param {string} network
     */
    handleNetworkChange = (network) => {
        this.setState({
            network,
            page: 1,
        }, () => {
            this.getNetworkPublicContracts(network);
        });
    };

    render() {
        return (
            <Page wholeScreenPage>
                <Helmet>
                    <title>Public Contracts | Tenderly</title>
                    <meta name="description" content="Free Web tutorials"/>
                    <meta name="keywords"
                          content={`smart contracts, public contracts, verified contracts`}/>
                </Helmet>
                <Container>
                    <ExplorerHeader/>
                    <TenderlyLogo/>
                    <PublicNetworksSearch/>
                    <ExplorerDescription/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {network}}} = ownProps;

    let networkType = getNetworkForRouteSlug(network);

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
)(ExplorerPage);
