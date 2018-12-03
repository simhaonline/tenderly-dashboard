import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import * as projectActions from '../../Core/Project/Project.actions';

import {Page, Container} from "../../Elements";
import {CreateProjectForm} from "../../Components";

class CreateProjectPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectCreated: false,
            project: null,
        };

    }

    handleFormSubmit = async (data) => {
        const {projectName} = data;


        if (!projectName) {
            return;
        }

        const {actions} = this.props;

        const project = await actions.createProject(projectName);

        this.setState({
            projectCreated: true,
            project,
        })
    };

    render() {
        const {projectCreated, project} = this.state;

        if (projectCreated) {
            return <Redirect to={`/project/${project.id}`}/>;
        }

        return (
            <Page>
                <Container>
                    <h2>Create Project</h2>
                    <CreateProjectForm onSubmit={this.handleFormSubmit}/>
                </Container>
            </Page>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
    }
};

export default connect(
    null,
    mapDispatchToProps
)(CreateProjectPage);
