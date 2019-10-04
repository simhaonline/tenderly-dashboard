import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {collaborationActions} from '../../Core/actions';

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page, PageHeading} from "../../Elements";
import {ProjectCollaborators} from "../../Components";

class ProjectCollaboratorsPage extends Component {
    render() {
        const {project, collaborators} = this.props;

        console.log(project);

        return (
            <Page id="ProjectPage">
                <Container>
                    <PageHeading>
                        <h1>Collaborators</h1>
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
