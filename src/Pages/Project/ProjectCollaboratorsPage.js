import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {collaborationActions} from '../../Core/actions';

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {Icon, Button, Container, Page, PageHeading} from "../../Elements";
import {ProjectCollaborators, ProjectContentLoader} from "../../Components";
import {
    areCollaboratorsLoadedForProject,
    getCollaboratorsForProject
} from "../../Common/Selectors/CollaborationSelectors";
import {ProjectTypes} from "../../Common/constants";

class ProjectCollaboratorsPage extends Component {
    componentDidMount() {
        const {actions, project, collaboratorsLoaded} = this.props;

        if (!collaboratorsLoaded) {
            actions.fetchCollaboratorsForProject(project);
        }
    }

    render() {
        const {project, collaborators, collaboratorsLoaded} = this.props;

        return (
            <Page id="ProjectPage">
                <Container>
                    <PageHeading>
                        <h1>Collaborators</h1>
                        {project.type === ProjectTypes.PRIVATE && <div className="MarginLeftAuto">
                            <Button to={`/${project.owner}/${project.slug}/collaborators/add`}>
                                <Icon icon="user-plus"/>
                                <span>Add Collaborator</span>
                            </Button>
                        </div>}
                    </PageHeading>
                    {!collaboratorsLoaded && <ProjectContentLoader text="Fetching project collaborators..."/>}
                    {collaboratorsLoaded && <ProjectCollaborators project={project} collaborators={collaborators} readOnly={project.type === ProjectTypes.SHARED}/>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {slug, username}}} = ownProps;

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        project,
        collaborators: getCollaboratorsForProject(state, project),
        collaboratorsLoaded: areCollaboratorsLoadedForProject(state, project),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(collaborationActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectCollaboratorsPage);
