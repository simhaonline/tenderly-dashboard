import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as projectActions from '../../Core/Project/Project.actions';

import {Page, Container, Card, CardHeading} from "../../Elements";
import {CreateProjectForm} from "../../Components";

import './CreateProjectPage.css';

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

        const {success, data: project} = await actions.createProject(projectName);

        if (success) {
            this.setState({
                projectCreated: true,
                project,
            });
        }
    };

    render() {
        const {projectCreated, project} = this.state;

        if (projectCreated) {
            return <Redirect to={`/project/${project.id}`}/>;
        }

        return (
            <Page id="CreateProjectPage">
                <Container className="PageContainer">
                        <div className="FormWrapper">
                            <Card>
                                <CardHeading>
                                    <h3>Create Project</h3>
                                </CardHeading>
                                <CreateProjectForm onSubmit={this.handleFormSubmit}/>
                            </Card>
                        </div>
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
