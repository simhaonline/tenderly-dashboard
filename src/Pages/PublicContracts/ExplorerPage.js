import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { Helmet } from "react-helmet";

import Analytics from "../../Utils/Analytics";
import {getNetworkForRouteSlug} from "../../Utils/RouterHelpers";

import {NetworkLabelMap, NetworkTypes} from "../../Common/constants";
import {getNetworkPublicContractsForPage} from "../../Common/Selectors/PublicContractSelectors";

import * as publicContractsActions from '../../Core/PublicContracts/PublicContracts.actions';

import {Page, Container, PageHeading} from "../../Elements";
import {PublicNetworksSearch, NetworkSegmentedPicker, PublicContractThumbnail, SimpleLoader, PublicContractList} from "../../Components";

class ExplorerPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            network: NetworkTypes.MAIN,
            networkPublicContracts: null,
            fetchingPublicContracts: false,
            mostWatchedContracts: [],
            page: 1,
        };
    }

    async componentDidMount() {
        const {actions} = this.props;

        this.getNetworkPublicContracts();

        const mostWatchedResponse = await actions.fetchMostWatchedContracts();

        Analytics.page('Loaded Explore Page');

        this.setState({
            mostWatchedContracts: mostWatchedResponse.data,
        });
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
        const {network, mostWatchedContracts, networkPublicContracts, fetchingPublicContracts, page} = this.state;

        return (
            <Page>
                <Helmet>
                    <title>Public Contracts | Tenderly</title>
                    <meta name="description" content="Free Web tutorials"/>
                    <meta name="keywords" content={`smart contracts, ${NetworkLabelMap[network].toLowerCase()}, public contracts, verified contracts`}/>
                </Helmet>
                <Container>
                    <PageHeading>
                        <h1>Search</h1>
                    </PageHeading>
                    <div className="MarginBottom4">
                        <PublicNetworksSearch/>
                    </div>
                    <PageHeading>
                        <h1>Most Watched</h1>
                    </PageHeading>
                    <div className="MarginBottom4">
                        {!!mostWatchedContracts.length && <div className="DisplayFlex OverflowYScroll">
                            {mostWatchedContracts.map(contract =>
                                <PublicContractThumbnail key={contract.getUniqueId()} contract={contract} displayWatchCount/>
                            )}
                        </div>}
                        {!mostWatchedContracts.length && <div className="DisplayFlex JustifyContentCenter Padding4">
                            <SimpleLoader/>
                        </div>}
                    </div>
                    <PageHeading>
                        <h1>All Public Contracts</h1>
                    </PageHeading>
                    <div>
                        <div className="MarginBottom3">
                            <NetworkSegmentedPicker value={network} onChange={this.handleNetworkChange}/>
                        </div>
                        {networkPublicContracts && <PublicContractList contracts={networkPublicContracts}
                                                                       page={page} onPageChange={this.handlePageChange}
                                                                       loading={fetchingPublicContracts}/>}
                    </div>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: { network }}} = ownProps;

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
