import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {ProjectTypes} from "../../Common/constants";
import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import * as projectActions from "../../Core/Project/Project.actions";

import {Container, Page, PageHeading} from "../../Elements";
import {ProjectSettingsForm, ProjectSettingsActions, ProjectPermissions} from "../../Components";

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

                await actions.deleteProject(project);
                break;
            case "LEAVE":
                this.setState({
                    projectDeleted: true,
                });

                await actions.leaveSharedProject(project);
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
            <Page id="ProjectSettingsPage">
                <Container>
                    <PageHeading>
                        <h1>Settings</h1>
                    </PageHeading>
                    <ProjectSettingsForm project={project}/>
                    {project.type === ProjectTypes.SHARED && <ProjectPermissions project={project}/>}
                    <ProjectSettingsActions project={project} onAction={this.handleProjectAction}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug}}} = ownProps;

    return {
        project: getProjectBySlugAndUsername(state, slug, username),
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
