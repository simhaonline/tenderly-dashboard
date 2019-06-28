import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { Helmet } from "react-helmet";

import {NetworkLabelMap, NetworkRouteToAppTypeMap, NetworkTypes} from "../../Common/constants";
import {getNetworkPublicContractsForPage} from "../../Common/Selectors/PublicContractSelectors";

import * as publicContractsActions from '../../Core/PublicContracts/PublicContracts.actions';

import {Page, Container, PageHeading} from "../../Elements";
import {NetworkSegmentedPicker, PublicContractThumbnail, SimpleLoader, PublicContractList} from "../../Components";

class PublicContractsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            network: NetworkTypes.MAIN,
            networkPublicContracts: null,
            mostWatchedContracts: [],
        };
    }

    async componentDidMount() {
        const {actions} = this.props;
        const {network} = this.state;

        this.getNetworkPublicContracts(network);

        const mostWatchedResponse = await actions.fetchMostWatchedContracts();

        this.setState({
            mostWatchedContracts: mostWatchedResponse.data,
        });
    }

    /**
     * @param {string} network
     */
    getNetworkPublicContracts = async (network) => {
        const {actions} = this.props;

        const response = await actions.fetchPublicContracts(network, 1, 10);

        this.setState({
            networkPublicContracts: response.data,
        });
    };

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
        this.setState({
            network,
        });

        this.getNetworkPublicContracts(network);
    };

    render() {
        const {network, mostWatchedContracts, networkPublicContracts} = this.state;

        return (
            <Page>
                <Helmet>
                    <title>Public Contracts | Tenderly</title>
                    <meta name="description" content="Free Web tutorials"/>
                    <meta name="keywords" content={`smart contracts, ${NetworkLabelMap[network].toLowerCase()}, public contracts, verified contracts`}/>
                </Helmet>
                <Container>
                    <PageHeading>
                        <h1>Most Watched</h1>
                    </PageHeading>
                    <div className="MarginBottom4">
                        {!!mostWatchedContracts.length && <div className="DisplayFlex">
                            {mostWatchedContracts.map(contract =>
                                <PublicContractThumbnail key={contract.address} contract={contract} displayWatchCount/>
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
                        <div>
                            <NetworkSegmentedPicker value={network} onChange={this.handleNetworkChange}/>
                        </div>
                        {networkPublicContracts && <PublicContractList contracts={networkPublicContracts}/>}
                    </div>
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
