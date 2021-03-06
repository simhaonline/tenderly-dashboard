import React, {Component} from 'react';
import {connect} from "react-redux";

import {Container, Page} from "../../Elements";
import {getProject} from "../../Common/Selectors/ProjectSelectors";

class ProjectReleasesPage extends Component {
    render() {
        return (
            <Page id="ProjectPage">
                <Container>
                    ProjectReleasesPage
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

export default connect(
    mapStateToProps,
    null
)(ProjectReleasesPage);
