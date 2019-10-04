import React, {Component} from 'react';
import {connect} from "react-redux";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page, PageHeading, Button, Icon} from "../../Elements";

class ProjectCollaboratorPage extends Component {
    render() {
        const {project} = this.props;

        return (
            <Page id="ProjectCollaboratorPage">
                <Container>
                    <PageHeading>
                        <Button outline to={`/${project.owner}/${project.slug}/collaborators`}>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>Collaborator</h1>
                    </PageHeading>
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

export default connect(
    mapStateToProps,
    null
)(ProjectCollaboratorPage);
