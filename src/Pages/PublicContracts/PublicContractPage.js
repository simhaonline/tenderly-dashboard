import React, {Component} from "react";
import {connect} from "react-redux";

import {Page} from "../../Elements";
import {getPublicContractById, isPublicContractLoaded} from "../../Common/Selectors/PublicContractSelectors";
import {bindActionCreators} from "redux";
import * as publicContractsActions from "../../Core/PublicContracts/PublicContracts.actions";
import {NetworkApiToAppTypeMap} from "../../Common/constants";
import {getPublicContractEvents} from "../../Common/Selectors/EventSelectors";

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
                {contract.name}

                {events.length && <div>
                    {events.map(event =>
                        <div key={event.transactionId} style={{display: 'flex'}}>
                            <div>
                                <div>{event.message}</div>
                                <div>{event.description} | {contract.name}:{event.lineNumber}</div>
                            </div>
                            <div>{event.transactionId}</div>
                            <div>{event.block}</div>
                            <div>{event.timestamp}</div>
                        </div>
                    )}
                </div>}
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
