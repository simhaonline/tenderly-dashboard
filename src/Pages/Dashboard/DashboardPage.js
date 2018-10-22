import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as projectActions from "../../Core/Project/Project.actions";

import {Page, Container} from "../../Elements";
import {DashboardProjectsList} from "../../Components";
import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";

class DashboardPage extends Component {
    componentDidMount() {
        const {projectsLoaded, actions} = this.props;

        if (!projectsLoaded) {
            actions.fetchProjects();
        }
    }
    render() {
        const {projectsLoaded, projects} = this.props;

        return (
            <Page>
                <Container>
                    <DashboardProjectsList projects={projects} loaded={projectsLoaded}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectsLoaded: state.project.projectsLoaded,
        projects: getDashboardProjects(state),
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
