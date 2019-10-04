import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Redirect} from "react-router-dom";

import {collaborationActions} from "../../Core/actions";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {Button, Container, Icon, Page, PageHeading, PanelContent, PanelHeader, Panel} from "../../Elements";
import {CollaboratorForm} from "../../Components";

class ProjectAddCollaboratorPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addedCollaborator: null,
        };
    }

    /**
     * @param {string} email
     * @param {CollaboratorPermissions} permissions
     *
     * @return {Promise<void>}
     */
    handleAddCollaborator = async (email, permissions) => {
        const {actions, project} = this.props;

        const response = await actions.createCollaboratorForProject(project, email, permissions);

        if (response.success) {
            setTimeout(() => {
                this.setState({
                    addedCollaborator: response.data,
                });
            }, 0);
        }
    };

    render() {
        const {project} = this.props;
        const {addedCollaborator} = this.state;

        if (addedCollaborator) {
            return <Redirect to={`/${project.owner}/${project.slug}/collaborators/${addedCollaborator.id}`}/>
        }

        return (
            <Page id="ProjectAddCollaboratorPage">
                <Container>
                    <PageHeading>
                        <Button outline to={`/${project.owner}/${project.slug}/collaborators`}>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>Add Collaborator</h1>
                    </PageHeading>
                    <Panel>
                        <PanelHeader>
                            <h3>Collaborator Details</h3>
                        </PanelHeader>
                        <PanelContent>
                            <CollaboratorForm onSubmit={this.handleAddCollaborator} submitLabel="Add Collaborator"/>
                        </PanelContent>
                    </Panel>
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
        actions: bindActionCreators(collaborationActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectAddCollaboratorPage);
