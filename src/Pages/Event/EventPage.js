import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getContractForEvent} from "../../Common/Selectors/ContractSelectors";
import {getEvent} from "../../Common/Selectors/EventSelectors";
import {areProjectContractsLoaded} from "../../Common/Selectors/ProjectSelectors";

import {NetworkRouteToAppTypeMap} from "../../Common/constants";

import * as eventActions from "../../Core/Event/Event.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Page, Container} from "../../Elements";
import {EventInformation, EventStackTrace, ProjectContentLoader} from "../../Components";

class EventPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };
    }

    async componentDidMount() {
        const {event, contract, projectId, contractActions, eventActions, network, eventId} = this.props;

        if (!event) {
            await eventActions.fetchEventForProject(projectId, network, eventId);
        }

        if (!contract) {
            await contractActions.fetchContractsForProject(projectId);
        }

        this.setState({
            loading: false,
        })
    }

    render() {
        const {event, contract} = this.props;
        const {loading} = this.state;

        if (loading) {
            return (
                <Page>
                    <Container>
                        <ProjectContentLoader text="Fetching error information..."/>
                    </Container>
                </Page>
            );
        }

        return (
            <Page>
                <Container>
                    {!!event && <Fragment>
                        <EventInformation event={event} contract={contract}/>
                        <EventStackTrace trace={event.trace} source={contract ? contract.getMainFileSource() : null}/>
                    </Fragment>}
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: { id, network, eventId }}} = ownProps;

    const networkType = NetworkRouteToAppTypeMap[network];

    const event = getEvent(state, eventId);

    return {
        event,
        eventId,
        contract: getContractForEvent(state, event),
        contractsLoaded: areProjectContractsLoaded(state, id),
        projectId: id,
        network: networkType,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        eventActions: bindActionCreators(eventActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventPage);
