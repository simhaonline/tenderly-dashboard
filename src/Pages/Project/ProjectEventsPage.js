import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as eventActions from "../../Core/Event/Event.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {EventActionTypes} from "../../Common/constants";
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
            loadingPage: false,
            page: props.page,
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

    handleRefreshEvents = async () => {
        const {page} = this.state;

        await this.fetchEventsForPage(page);
    };

    /**
     * @param {Number} nextPage
     * @returns {Promise<void>}
     */
    handlePageChange = async (nextPage) => {
        this.setState({
            page: nextPage,
        });

        await this.fetchEventsForPage(nextPage);
    };

    handleEventAction = (action) => {
        switch (action.type) {
            case EventActionTypes.REFRESH:
                return this.handleRefreshEvents();
            case EventActionTypes.PREVIOUS_PAGE:
            case EventActionTypes.NEXT_PAGE:
                return this.handlePageChange(action.nextPage);
            default:
                return;
        }
    };

    fetchEventsForPage = async (page) => {
        const {project, eventActions, history} = this.props;

        this.setState({
            loadingPage: true,
        });

        history.push(`?page=${page}`);

        await eventActions.fetchEventsForProject(project.id, page);

        this.setState({
            loadingPage: false,
        });
    };

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
                        <ProjectEventActions page={page} onAction={this.handleEventAction}/>
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

    const queryPage = parseInt(searchParams.get('page')) || 0;

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
