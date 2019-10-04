import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {collaborationActions} from "../../Core/actions";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {
    areCollaboratorsLoadedForProject,
    getCollaboratorForProject
} from "../../Common/Selectors/CollaborationSelectors";

import {Container, Page, PageHeading, Button, Icon, Panel, PanelHeader, PanelContent} from "../../Elements";
import {ProjectContentLoader, EmptyState, CollaboratorInfo} from "../../Components";

class ProjectCollaboratorPage extends Component {
    componentDidMount() {
        const {actions, project, collaboratorsLoaded} = this.props;

        if (!collaboratorsLoaded) {
            actions.fetchCollaboratorsForProject(project);
        }
    }

    render() {
        const {project, collaboratorsLoaded, collaborator} = this.props;

        return (
            <Page id="ProjectCollaboratorPage">
                <Container>
                    <PageHeading>
                        <Button outline to={`/${project.owner}/${project.slug}/collaborators`}>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>Collaborator</h1>
                    </PageHeading>
                    {!collaboratorsLoaded && <ProjectContentLoader text="Fetching collaborator..."/>}
                    {collaboratorsLoaded && <Panel>
                        {!!collaborator && <PanelHeader>
                            <h3>{collaborator.getDisplayableIdentifier()} <span className="MutedText">(Collaborator)</span></h3>
                        </PanelHeader>}
                        <PanelContent>
                            {!collaborator && <EmptyState icon="user" title="Collaborator doesn't exist" description="Seems that his collaborator has not been added to this project or does not exist."/>}
                            {!!collaborator && <CollaboratorInfo collaborator={collaborator}/>}
                        </PanelContent>
                    </Panel>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug, collaboratorId}}} = ownProps;

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        project,
        collaboratorsLoaded: areCollaboratorsLoadedForProject(state, project),
        collaborator: getCollaboratorForProject(state, project, collaboratorId),
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
)(ProjectCollaboratorPage);
