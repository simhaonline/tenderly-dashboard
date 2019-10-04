import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Redirect} from 'react-router-dom';

import {collaborationActions} from "../../Core/actions";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {
    areCollaboratorsLoadedForProject,
    getCollaboratorForProject
} from "../../Common/Selectors/CollaborationSelectors";

import {Container, Page, PageHeading, Button, Icon, Panel, PanelHeader, PanelContent, Dialog, DialogHeader, DialogBody} from "../../Elements";
import {ProjectContentLoader, EmptyState, CollaboratorInfo, CollaboratorForm} from "../../Components";

class ProjectCollaboratorPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editingMode: false,
            redirectBack: false,
            deleteModalOpen: false,
        };
    }

    componentDidMount() {
        const {actions, project, collaboratorsLoaded} = this.props;

        if (!collaboratorsLoaded) {
            actions.fetchCollaboratorsForProject(project);
        }
    }

    handleCollaboratorUpdate = async (email, permissions) => {
        const {project, actions, collaborator} = this.props;

        const response = await actions.updateCollaboratorForProject(project, collaborator, permissions);

        if (response.success) {
            setTimeout(() => {
                this.toggleEditingMode();
            }, 0);
        }
    };

    toggleEditingMode = () => {
        this.setState({
            editingMode: !this.state.editingMode,
        })
    };

    handleDeleteCollaborator = async () => {
        const {project, actions, collaborator} = this.props;

        this.closeDeleteModal();

        const response = await actions.deleteCollaboratorForProject(project, collaborator);

        if (response.success) {
            this.setState({
                redirectBack: true,
            })
        }
    };

    openDeleteModal = () => {
        this.setState({
            deleteModalOpen: true,
        });
    };

    closeDeleteModal = () => {
        this.setState({
            deleteModalOpen: false,
        });
    };

    render() {
        const {project, collaboratorsLoaded, collaborator} = this.props;
        const {editingMode, deleteModalOpen, redirectBack} = this.state;

        if (redirectBack) {
            return <Redirect to={`/${project.owner}/${project.slug}/collaborators`}/>
        }

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
                            {!!collaborator && !editingMode && <div>
                                <CollaboratorInfo collaborator={collaborator}/>
                                <div className="MarginTop4">
                                    <Button onClick={this.toggleEditingMode}>
                                        <Icon icon="lock"/>
                                        <span>Edit Permissions</span>
                                    </Button>
                                    <Button color="danger" outline onClick={this.openDeleteModal}>
                                        <Icon icon="user-minus"/>
                                        <span>Remove Collaborator</span>
                                    </Button>
                                </div>
                                <Dialog onClose={this.closeDeleteModal} open={deleteModalOpen}>
                                    <DialogHeader>
                                        <h3>Remove Collaborator from {project.name}</h3>
                                    </DialogHeader>
                                    <DialogBody>
                                        <p>Are your sure you wish to remove <span className="SemiBoldText">{collaborator.getDisplayableIdentifier()}</span> from <span className="SemiBoldText">{project.name}</span>? By doing this, the user will be revoked access to this project.</p>
                                        <div className="DisplayFlex JustifyContentCenter MarginTop4">
                                            <Button onClick={this.handleDeleteCollaborator}>
                                                <span>Delete</span>
                                            </Button>
                                            <Button outline onClick={this.closeDeleteModal}>
                                                <span>Cancel</span>
                                            </Button>
                                        </div>
                                    </DialogBody>
                                </Dialog>
                            </div>}
                            {!!collaborator && editingMode && <CollaboratorForm submitLabel="Update Permissions" onCancel={this.toggleEditingMode} readOnlyEmail onSubmit={this.handleCollaboratorUpdate} collaborator={collaborator}/>}
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
