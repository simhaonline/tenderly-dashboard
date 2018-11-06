import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as projectActions from "../../Core/Project/Project.actions";

import {getProject} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page} from "../../Elements";
import {ProjectSettingsForm, ProjectSettingsActions, ProjectSettingsBilling} from "../../Components";

class ProjectSettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectDeleted: false,
        };
    }

    handleProjectAction = async (action) => {
        const {actions, project} = this.props;

        switch (action.type) {
            case "DELETE":
                this.setState({
                    projectDeleted: true,
                });

                await actions.deleteProject(project.id);
                break;
            default:
                break;
        }
    };

    render() {
        const {project} = this.props;
        const {projectDeleted} = this.state;

        if (projectDeleted) {
            return <Redirect to="/dashboard"/>
        }

        return (
            <Page id="ProjectPage">
                <Container>
                    <ProjectSettingsForm project={project}/>
                    <ProjectSettingsBilling/>
                    <ProjectSettingsActions onAction={this.handleProjectAction}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}} = ownProps;

    return {
        project: getProject(state, id),
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
)(ProjectSettingsPage);
