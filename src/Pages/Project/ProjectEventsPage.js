import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as eventActions from "../../Core/Event/Event.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import EventFilters from "../../Utils/EventFilters";

import {EventActionTypes, EventFilterTypes, ProjectTypes} from "../../Common/constants";
import {areProjectContractsLoaded, getProject} from "../../Common/Selectors/ProjectSelectors";
import {getEventsForProject} from "../../Common/Selectors/EventSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {Container, Page} from "../../Elements";
import {ProjectEvents, ProjectSetupEmptyState, ProjectEventFilters, ProjectEventActions, ProjectContentLoader} from "../../Components";

class ProjectEventsPage extends Component {
    constructor(props) {
        super(props);

        const {location: {search}} = props;

        const searchParams = new URLSearchParams(search);

        const contractFilter = searchParams.get('contract');

        let filters = {};

        if (contractFilter) {
            filters = {
                [EventFilterTypes.CONTRACTS]: {
                    type: EventFilterTypes.CONTRACTS,
                    value: [contractFilter],
                },
            };
        }

        this.state = {
            filters,
            loadedPage: false,
            loadingPage: false,
            page: props.page,
        };
    }

    async componentDidMount() {
        const {contractsLoaded, project, eventActions, contractActions} = this.props;
        const {page} = this.state;

        if (project.lastPushAt && project.type !== ProjectTypes.DEMO) {
            await eventActions.fetchEventsForProject(project.id, page);

            if (!contractsLoaded) {
                await contractActions.fetchContractsForProject(project.id);
            }
        }

        this.setState({
            loadedPage: true,
        });
    }

    handleRefreshEvents = async () => {
        const {page} = this.state;

        await this.fetchEventsForPage(page);
    };

    /**
     * @param {EventFilter} filter
     */
    handleFiltersChange = (filter) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [filter.type]: filter,
            }
        });
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

    /**
     * @param {number} page
     * @returns {Promise<void>}
     */
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
        const {loadedPage, loadingPage, page, filters} = this.state;
        const {project, events, contracts, contractsLoaded} = this.props;

        const projectIsSetup = !!project.lastPushAt;
        // @TODO This should be done better tbh.
        const projectIsLoaded = loadedPage || contractsLoaded;

        const activeFilters = Object.values(filters).filter(filter => filter.value.length);

        const filteredEvents = EventFilters.filterEvents(events, activeFilters);

        return (
            <Page id="ProjectPage">
                <Container>
                    {!projectIsSetup && <ProjectSetupEmptyState project={project}/>}
                    {projectIsSetup && projectIsLoaded && <Fragment>
                        <ProjectEventFilters contracts={contracts}
                                             onFiltersChange={this.handleFiltersChange}
                                             activeFilters={activeFilters}/>
                        <ProjectEventActions page={page} onAction={this.handleEventAction} loading={loadingPage}/>
                        <ProjectEvents events={filteredEvents} contracts={contracts} loading={loadingPage}/>
                    </Fragment>}
                    {projectIsSetup && !projectIsLoaded && <ProjectContentLoader text="Fetching errors for your project..."/>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}, location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const queryPage = parseInt(searchParams.get('page')) || 1;

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
