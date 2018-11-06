import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {getProject} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page} from "../../Elements";
import {ProjectSettingsForm, ProjectSettingsActions} from "../../Components";

class ProjectSettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectDeleted: false,
        };
    }

    handleProjectAction = (action) => {
        switch (action.type) {
            case "DELETE":
                this.setState({
                    projectDeleted: true,
                });
                break;
            default:
                break;
        }
    };

    render() {
        const {project} = this.props;
        const {projectDeleted} = this.state;

        if (projectDeleted) {
            return <Redirect to="/dashboard"/>
        }

        return (
            <Page id="ProjectPage">
                <Container>
                    <ProjectSettingsForm project={project}/>
                    <ProjectSettingsActions onAction={this.handleProjectAction}/>
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
