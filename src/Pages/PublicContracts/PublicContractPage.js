import React, {Component} from "react";
import {connect} from "react-redux";

import {Page, Container} from "../../Elements";
import {getPublicContractById, isPublicContractLoaded} from "../../Common/Selectors/PublicContractSelectors";
import {bindActionCreators} from "redux";
import * as publicContractsActions from "../../Core/PublicContracts/PublicContracts.actions";
import {NetworkApiToAppTypeMap} from "../../Common/constants";
import {getPublicContractEvents} from "../../Common/Selectors/EventSelectors";
import {EventList} from "../../Components";

class PublicContractPage extends Component {
    componentDidMount() {
        const {contract, contractLoaded, networkType, eventsLoaded, actions, match: {params: { id }}} = this.props;

        if (!contract || !contractLoaded) {
            actions.fetchPublicContract(id, networkType);
        }

        if (!contract || !eventsLoaded) {
            actions.fetchPublicContractEvents(id, networkType);
        }
    }
    render() {
        const {contract, events} = this.props;

        if (!contract) {
            return (
                <Page>
                    Fetching data...
                </Page>
            )
        }

        return (
            <Page>
                <Container>
                    {contract.name}

                    {events.length && <EventList events={events} contract={contract}/>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: { id, network }}} = ownProps;

    const networkType = NetworkApiToAppTypeMap[network];

    return {
        contract: getPublicContractById(state, id),
        contractLoaded: isPublicContractLoaded(state, id),
        events: getPublicContractEvents(state, id, networkType),
        networkType,
        eventsLoaded: false,
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
