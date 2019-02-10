import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Redirect} from "react-router-dom";

import * as projectActions from "../../Core/Project/Project.actions";
import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";

import {Page, Container} from "../../Elements";
import {DashboardProjectsList, RecentArticles, FeatureFlag} from "../../Components";
import {FeatureFlagTypes} from "../../Common/constants";

class DashboardPage extends Component {
    componentDidMount() {
        const {projectsLoaded, usernameSet, actions} = this.props;

        if (!projectsLoaded && usernameSet) {
            actions.fetchProjects();
        }
    }
    render() {
        const {projectsLoaded, projects, usernameSet} = this.props;

        if (!usernameSet) {
            return <Redirect to="/onboarding"/>
        }

        return (
            <Page>
                <Container>
                    <DashboardProjectsList projects={projects} loaded={projectsLoaded}/>
                    <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                        <RecentArticles/>
                    </FeatureFlag>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectsLoaded: state.project.projectsLoaded,
        projects: getDashboardProjects(state),
        usernameSet: state.auth.usernameSet,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DashboardPage);
