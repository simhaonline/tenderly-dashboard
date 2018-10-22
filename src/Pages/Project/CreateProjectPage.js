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

        initializeForm(this, {
            projectName: '',
            projectSlug: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleFormSubmit = async () => {
        const {formData: {projectName, projectSlug}} = this.state;


        if (!projectName || !projectSlug) {
            return;
        }

        const {actions} = this.props;

        const project = await actions.createProject(projectName, projectSlug);

        this.setState({
            projectCreated: true,
            project,
        })
    };

    render() {
        const {formData, projectCreated} = this.state;

        if (projectCreated) {
            // @TODO Redirect to individual project page
            return <Redirect to="/dashboard"/>
        }

        return (
            <Page>
                <Container>
                    <CreateProjectForm formData={formData} onChange={this.handleFormUpdate} onSubmit={this.handleFormSubmit}/>
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
