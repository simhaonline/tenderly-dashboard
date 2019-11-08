import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";

import Analytics from "../../Utils/Analytics";
import {getNetworkForRouteSlug} from "../../Utils/RouterHelpers";

import {getNetworkPublicContractsForPage} from "../../Common/Selectors/PublicContractSelectors";

import * as publicContractsActions from '../../Core/PublicContracts/PublicContracts.actions';

import {Page, Container} from "../../Elements";
import {PublicNetworksSearch, TenderlyLogo, ExplorerDescription, ExplorerHeader} from "../../Components";

import "./ExplorerPage.scss";

class ExplorerPage extends Component {
    async componentDidMount() {
        Analytics.page('Loaded Explore Page');
    }

    render() {
        return (
            <Page wholeScreenPage id="ExplorerPage">
                <Helmet>
                    <title>Public Contracts | Tenderly</title>
                    <meta name="description" content="Free Web tutorials"/>
                    <meta name="keywords"
                          content={`smart contracts, public contracts, verified contracts`}/>
                </Helmet>
                <Container className="ExplorerPage__Container">
                    <ExplorerHeader/>
                    <TenderlyLogo className="ExplorerPage__Logo" width={240}/>
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
