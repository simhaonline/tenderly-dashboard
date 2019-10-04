import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {collaborationActions} from '../../Core/actions';

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {Icon, Button, Container, Page, PageHeading} from "../../Elements";
import {ProjectCollaborators} from "../../Components";

class ProjectCollaboratorsPage extends Component {
    componentDidMount() {
        const {actions, project, collaboratorsLoaded} = this.props;

        if (!collaboratorsLoaded) {
            actions.fetchCollaboratorsForProject(project);
        }
    }

    render() {
        const {project, collaborators} = this.props;

        return (
            <Page id="ProjectPage">
                <Container>
                    <PageHeading>
                        <h1>Collaborators</h1>
                        <div className="MarginLeftAuto">
                            <Button to={`/${project.owner}/${project.slug}/collaborators/add`}>
                                <Icon icon="user-plus"/>
                                <span>Add Collaborator</span>
                            </Button>
                        </div>
                    </PageHeading>
                    <ProjectCollaborators project={project} collaborators={collaborators}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {slug, username}}} = ownProps;

    return {
        project: getProjectBySlugAndUsername(state, slug, username),
        collaborators: [],
        collaboratorsLoaded: false,
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
