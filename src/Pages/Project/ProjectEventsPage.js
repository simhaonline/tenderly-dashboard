import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as eventActions from "../../Core/Event/Event.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {getProject} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page} from "../../Elements";
import {ProjectEvents, ProjectSetupGuide} from "../../Components";

class ProjectEventsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadedPage: false,
        };
    }
    async componentDidMount() {
        const {contracts, events, project, eventActions, contractActions} = this.props;

        if (project.lastPushAt) {
            if (!events.length) {
                await eventActions.fetchEventsForProject(project.id, 0);
            }

            if (!contracts.length) {
                await contractActions.fetchContractsForProject(project.id);
            }

            this.setState({
                loadedPage: true,
            });
        }
    }

    render() {
        const {loadedPage} = this.state;
        const {project, events} = this.props;

        const projectIsSetup = !!project.lastPushAt;

        return (
            <Page id="ProjectPage">
                <Container>
                    {!projectIsSetup && <ProjectSetupGuide/>}
                    {projectIsSetup && loadedPage && <ProjectEvents events={events}/>}
                    {projectIsSetup && !loadedPage && <div>
                        Loading...
                    </div>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}} = ownProps;

    return {
        project: getProject(state, id),
        contracts: [],
        events: [],
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
)(ProjectEventsPage);
