import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import * as projectActions from '../../Core/Project/Project.actions';

import {getUserPlan} from "../../Common/Selectors/BillingSelectors";

import {Page, Container, Panel, PanelContent, PanelHeader, Icon, Alert} from "../../Elements";
import {CreateProjectForm} from "../../Components";

import './CreateProjectPage.scss';

class CreateProjectPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectCreated: false,
            project: null,
            error: null,
        };

    }

    handleFormSubmit = async (data) => {
        const {projectName} = data;

        this.setState({
            error: null,
        });

        if (!projectName) {
            return {
                success: false,
            };
        }

        const {actions} = this.props;

        const {success, data: project} = await actions.createProject(projectName);

        if (success) {
            this.setState({
                projectCreated: true,
                project,
            });
        } else {
            this.setState({
                error: project.error,
            });
        }

        return {
            success,
            data: project,
        }
    };

    render() {
        const {userPlan} = this.props;
        const {projectCreated, project, error} = this.state;

        if (projectCreated) {
            return <Redirect to={`/${project.owner}/${project.slug}`}/>;
        }

        return (
            <Page id="CreateProjectPage">
                <Container>
                        <div className="FormWrapper">
                            <Panel>
                                <PanelHeader>
                                    <h3>Create Project</h3>
                                </PanelHeader>
                                <PanelContent>
                                    {!!error && <Alert color="danger">
                                        <span>{error.message}</span>
                                    </Alert>}
                                    <CreateProjectForm plan={userPlan} onSubmit={this.handleFormSubmit}/>
                                </PanelContent>
                            </Panel>
                            <Link to="/dashboard" className="GoBackLink">
                                <Icon icon="arrow-left"/>
                                <span>Go back</span>
                            </Link>
                        </div>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userPlan: getUserPlan(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProjectPage);
