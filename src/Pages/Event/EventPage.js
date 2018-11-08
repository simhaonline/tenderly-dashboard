import React, {Component} from "react";
import {connect} from "react-redux";

import {getContractForEvent} from "../../Common/Selectors/ContractSelectors";
import {getEvent} from "../../Common/Selectors/EventSelectors";

import {NetworkRouteToAppTypeMap} from "../../Common/constants";

import {Page, Container} from "../../Elements";
import {EventInformation, EventStackTrace} from "../../Components";

class EventPage extends Component {
    async componentDidMount() {
        const {event, contract} = this.props;

        if (!event) {
            // @TODO Fetch missing event
        }

        if (!contract) {
            // @TODO Fetch missing contract
        }
    }

    render() {
        const {event, contract} = this.props;

        if (!event || !contract) {
            return (
                <Page>
                    <Container>
                        Loading...
                    </Container>
                </Page>
            );
        }

        return (
            <Page>
                <Container>
                    <EventInformation event={event} network={contract.network}/>
                    <EventStackTrace trace={event.trace} source={contract.source}/>
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: { id, network, eventId }}} = ownProps;

    const networkType = NetworkRouteToAppTypeMap[network];

    const event =  getEvent(state, eventId);

    return {
        event,
        contract: getContractForEvent(state, event),
        projectId: id,
        network: networkType,
    }
};

export default connect(
    mapStateToProps,
    null,
)(EventPage);
