import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as eventActions from "../../Core/Event/Event.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {areProjectContractsLoaded, getProject} from "../../Common/Selectors/ProjectSelectors";
import {getEventsForProject} from "../../Common/Selectors/EventSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {Container, Page} from "../../Elements";
import {ProjectEvents, ProjectSetupGuide, ProjectEventFilters, ProjectEventActions} from "../../Components";

class ProjectEventsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadedPage: false,
            page: props.page || 0,
        };
    }

    async componentDidMount() {
        const {contractsLoaded, project, eventActions, contractActions} = this.props;
        const {page} = this.state;

        if (project.lastPushAt) {
            await eventActions.fetchEventsForProject(project.id, page);

            if (!contractsLoaded) {
                await contractActions.fetchContractsForProject(project.id);
            }

            this.setState({
                loadedPage: true,
            });
        }
    }

    static getDerivedStateFromProps(props, state) {
        const {eventActions, page: propsPage, project } = props;
        const {page: statePage} = state;

        if (propsPage !== statePage) {
            eventActions.fetchEventsForProject(project.id, propsPage);
        }

        return {
            ...state,
            page: propsPage,
        };
    }

    render() {
        const {loadedPage, page} = this.state;
        const {project, events, contracts} = this.props;

        const projectIsSetup = !!project.lastPushAt;

        return (
            <Page id="ProjectPage">
                <Container>
                    {!projectIsSetup && <ProjectSetupGuide projectId={project.id}/>}
                    {projectIsSetup && loadedPage && <Fragment>
                        <ProjectEventFilters contracts={contracts}/>
                        <ProjectEventActions projectId={project.id} page={page}/>
                        <ProjectEvents events={events} contracts={contracts}/>
                    </Fragment>}
                    {projectIsSetup && !loadedPage && <div>
                        Loading...
                    </div>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}, location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const queryPage = parseInt(searchParams.get('page'));

    return {
        project: getProject(state, id),
        contracts: getContractsForProject(state, id),
        contractsLoaded: areProjectContractsLoaded(state, id),
        events: getEventsForProject(state, id, queryPage),
        page: queryPage,
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
