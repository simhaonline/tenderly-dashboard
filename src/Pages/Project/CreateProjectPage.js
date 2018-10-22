import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import * as projectActions from '../../Core/Project/Project.actions';

import {Page, Container} from "../../Elements";
import {CreateProjectForm} from "../../Components";

class CreateProjectPage extends Component {
    constructor(props) {
        super(props);

        initializeForm(this, {
            projectName: '',
            projectSlug: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleFormSubmit = () => {
        const {formData: {projectName, projectSlug}} = this.state;


        if (!projectName || !projectSlug) {
            return;
        }

        const {actions} = this.props;

        actions.createProject(projectName, projectSlug);
    };

    render() {
        const {formData} = this.state;

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
