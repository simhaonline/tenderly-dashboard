import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {NetworkRouteTypes, NetworkTypes} from "../../Common/constants";
import {getNetworkPublicContractsForPage} from "../../Common/Selectors/PublicContractSelectors";

import * as publicContractsActions from '../../Core/PublicContracts/PublicContracts.actions';

import {Page, Container} from "../../Elements";
import PublicContractList from "../../Components/PublicContractList/PublicContractList";

const routeNetworkMap = {
    [NetworkRouteTypes.MAIN]: NetworkTypes.MAIN,
    [NetworkRouteTypes.KOVAN]: NetworkTypes.KOVAN,
};

class PublicContractsPage extends Component {
    componentDidMount() {
        const {actions} = this.props;

        actions.fetchPublicContracts(NetworkTypes.KOVAN, 0, '0x296eaae0c8d9216a46bf6520d37b96058b14d03d');
    }
    render() {
        const {contracts} = this.props;

        return (
            <Page>
                <Container>
                    <PublicContractList contracts={contracts}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: { network }}} = ownProps;

    const networkType = routeNetworkMap[network];

    return {
        contracts: getNetworkPublicContractsForPage(state, networkType, 0),
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
