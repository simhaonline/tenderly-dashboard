import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Redirect} from "react-router-dom";
import {Helmet} from "react-helmet";

import * as projectActions from "../../Core/Project/Project.actions";
import * as publicContractActions from "../../Core/PublicContracts/PublicContracts.actions";

import {FeatureFlagTypes} from "../../Common/constants";
import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";
import {areWatchedContractsLoaded, getWatchedContracts} from "../../Common/Selectors/PublicContractSelectors";

import {Page, Container, PageHeading, Button} from "../../Elements";
import {DashboardProjectsList, WatchedContractsList, DashboardSidebar, FeatureFlag} from "../../Components";

class DashboardPage extends Component {
    componentDidMount() {
        const {projectsLoaded, watchedContractsLoaded, usernameSet, username, actions, publicContractActions} = this.props;

        if (!projectsLoaded && usernameSet) {
            actions.fetchProjects(username);
        }

        if (!watchedContractsLoaded && usernameSet) {
            publicContractActions.fetchWatchedContracts(username);
        }
    }

    handleTryExample = () => {
        const {actions} = this.props;

        actions.createExampleProject();
    };

    render() {
        const {projectsLoaded, projects, usernameSet, watchedContracts, watchedContractsLoaded} = this.props;

        if (!usernameSet) {
            return <Redirect to="/onboarding"/>
        }

        return (
            <Fragment>
                <FeatureFlag flag={FeatureFlagTypes.ORGANIZATIONS}>
                    <DashboardSidebar/>
                </FeatureFlag>
                <Page>
                    <Container>
                        <Helmet>
                            <title>Dashboard | Tenderly</title>
                        </Helmet>
                        <PageHeading>
                            <h1>Projects</h1>
                        </PageHeading>
                        <DashboardProjectsList onTryExample={this.handleTryExample} projects={projects} loaded={projectsLoaded}/>
                        <PageHeading>
                            <h1>Watched Contracts</h1>
                            <div className="RightContent">
                                {(watchedContractsLoaded && !!watchedContracts.length) && <Button to={`/explorer`} outline size="small">
                                    <span>Discover Contracts</span>
                                </Button>}
                            </div>
                        </PageHeading>
                        <WatchedContractsList contracts={watchedContracts} loaded={watchedContractsLoaded}/>
                    </Container>
                </Page>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectsLoaded: state.project.projectsLoaded,
        projects: getDashboardProjects(state),
        watchedContracts: getWatchedContracts(state),
        watchedContractsLoaded: areWatchedContractsLoaded(state),
        usernameSet: state.auth.usernameSet,
        username: state.auth.user.username,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
        publicContractActions: bindActionCreators(publicContractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DashboardPage);
