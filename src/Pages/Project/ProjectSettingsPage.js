import React, {Component} from 'react';
import {connect} from "react-redux";

import {getProject} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page} from "../../Elements";
import {ProjectSettingsForm} from "../../Components";

class ProjectSettingsPage extends Component {
    render() {
        const {project} = this.props;

        return (
            <Page id="ProjectPage">
                <Container>
                    <ProjectSettingsForm project={project}/>
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
)(ProjectSettingsPage);
