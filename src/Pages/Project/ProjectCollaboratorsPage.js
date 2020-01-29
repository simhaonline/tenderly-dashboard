import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {PlanUsageTypes, ProjectTypes} from "../../Common/constants";

import {collaborationActions} from '../../Core/actions';

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {
    areCollaboratorsLoadedForProject,
    getCollaboratorsForProject
} from "../../Common/Selectors/CollaborationSelectors";

import {Icon, Container, Page, PageHeading} from "../../Elements";
import {ProjectCollaborators, ProjectContentLoader, PaidFeatureButton} from "../../Components";
import {getAccountPlanForProject} from "../../Common/Selectors/BillingSelectors";

class ProjectCollaboratorsPage extends Component {
    componentDidMount() {
        const {actions, project, collaboratorsLoaded} = this.props;

        if (!collaboratorsLoaded) {
            actions.fetchCollaboratorsForProject(project);
        }
    }

    render() {
        const {project, accountPlan, collaborators, collaboratorsLoaded} = this.props;

        return (
            <Page id="ProjectPage">
                <Container>
                    <PageHeading>
                        <h1>Collaborators</h1>
                        {project.type === ProjectTypes.PRIVATE && <div className="MarginLeftAuto">
                            <PaidFeatureButton plan={accountPlan} usage={PlanUsageTypes.INVITED_USERS} to={`/${project.owner}/${project.slug}/collaborators/add`}>
                                <Icon icon="user-plus"/>
                                <span>Add Collaborator</span>
                            </PaidFeatureButton>
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
        accountPlan: getAccountPlanForProject(state, project),
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
