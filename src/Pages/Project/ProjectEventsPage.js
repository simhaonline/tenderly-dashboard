import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as eventActions from "../../Core/Event/Event.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {areProjectContractsLoaded, getProject} from "../../Common/Selectors/ProjectSelectors";
import {getEventsForProject} from "../../Common/Selectors/EventSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

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
        const {contractsLoaded, project, eventActions, contractActions} = this.props;

        if (project.lastPushAt) {
            await eventActions.fetchEventsForProject(project.id, 0);

            if (!contractsLoaded) {
                await contractActions.fetchContractsForProject(project.id);
            }

            this.setState({
                loadedPage: true,
            });
        }
    }

    render() {
        const {loadedPage} = this.state;
        const {project, events, contracts} = this.props;

        const projectIsSetup = !!project.lastPushAt;

        return (
            <Page id="ProjectPage">
                <Container>
                    {!projectIsSetup && <ProjectSetupGuide projectId={project.id}/>}
                    {projectIsSetup && loadedPage && <ProjectEvents events={events} contracts={contracts}/>}
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
        contracts: getContractsForProject(state, id),
        contractsLoaded: areProjectContractsLoaded(state, id),
        events: getEventsForProject(state, id, 0),
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
