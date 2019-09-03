import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Redirect} from "react-router-dom";

import Analytics from "../../Utils/Analytics";

import * as projectActions from "../../Core/Project/Project.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Contract} from "../../Core/models";

import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";

import {formatProjectSlug} from "../../Utils/Formatters";

import {Dialog, DialogBody, DialogHeader, Input, Form, Button, Select, Card} from "../../Elements";
import {SimpleLoader} from "..";

import './PublicContractQuickActionModal.scss';

class PublicContractQuickActionModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectTo: null,
            step: 'add_to_project',
            createProject: false,
            selectedProject: null,
            projectName: '',
        };
    }

    componentDidUpdate(prevProps) {
        const {open, projectsLoaded, actions, loggedIn} = this.props;

        if (open && !projectsLoaded && loggedIn && open !== prevProps.open) {
            actions.fetchProjects();
        }
    }

    handleModalClose = () => {
        const {onClose} = this.props;

        this.setState({
            redirectTo: null,
            step: 'add_to_project',
            createProject: false,
            selectedProject: null,
            creatingProject: false,
            creatingProjectError: null,
        });

        onClose();
    };

    handleProjectSelect = (option) => {
        if (option.value === 'new_project') {
            this.setState({
                createProject: true,
            });

            return;
        }

        this.setState({
            selectedProject: option,
        });
    };

    handleProjectNameChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    /**
     * @param {string} projectId
     */
    goToProjectBasedOnAction = (projectId) => {
        const {type} = this.props;

        let urlSuffix = '';

        if (type === 'setup_alerting') {
            urlSuffix = '/alerts/rules/create';
        }

        Analytics.trackEvent(`public_contract_quick_action`, {
            action_type: type,
        });

        this.setState({
            actionInProgress: false,
            redirectTo: `/project/${projectId}${urlSuffix}`,
        });
    };

    createProjectAndAddToProject = async () => {
        const {projectName} = this.state;
        const {actions, contractActions, contract} = this.props;

        this.setState({
            creatingProject: true,
            actionInProgress: true,
        });

        const response = await actions.createProject(projectName);

        if (!response.success) {
            this.setState({
                creatingProject: false,
                error: response.data,
            });

            return;
        }

        const project = response.data;

        const addResponse = await actions.addVerifiedContractToProject(
            project.id,
            contract.network,
            contract.address
        );

        if (!addResponse.success) {
            this.setState({
                creatingProject: false,
                error: addResponse.data,
            });

            return;
        }

        await actions.fetchProject(project.id);
        await contractActions.fetchContractsForProject(project.id);

        this.goToProjectBasedOnAction(project.slug);
    };

    addToProject = async () => {
        const {selectedProject} = this.state;
        const {actions, contractActions, contract} = this.props;

        this.setState({
            actionInProgress: true,
        });

        const projectId = selectedProject.value;

        const addResponse = await actions.addVerifiedContractToProject(
            projectId,
            contract.network,
            contract.address
        );

        if (!addResponse.success) {
            this.setState({
                creatingProject: false,
                error: addResponse.data,
            });

            return;
        }

        await actions.fetchProject(projectId);
        await contractActions.fetchContractsForProject(projectId);

        this.goToProjectBasedOnAction(projectId);
    };

    render() {
        const {open, type, projectsLoaded, projects} = this.props;
        const {step, createProject, selectedProject, projectName, redirectTo, actionInProgress} = this.state;

        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }

        return (
            <Dialog open={open} onClose={this.handleModalClose} className="PublicContractQuickActionModal">
                <DialogHeader>
                    <h3>
                        {type === 'add_to_project' && <span>Add to Project</span>}
                        {type === 'setup_alerting' && <span>Setup Alerts</span>}
                        {type === 'filter_transactions' && <span>Filter Transactions</span>}
                        <span> | Quick Action</span>
                    </h3>
                </DialogHeader>
                <DialogBody className="PublicContractQuickActionModal__Body">
                    {actionInProgress && <div className="PublicContractQuickActionModal__LoaderWrapper">
                        <SimpleLoader/>
                    </div>}
                    {step === 'add_to_project' && <div>
                        {!projectsLoaded && <div className="DisplayFlex Padding4 JustifyContentCenter">
                            <SimpleLoader/>
                        </div>}
                        {projectsLoaded && <div>
                            {!!projects.length && !createProject && <div>
                                <h4 className="MarginBottom1">Select project</h4>
                                <Select value={selectedProject} selectLabel="Select project" onChange={this.handleProjectSelect} options={[
                                    ...projects.map(project => ({
                                        value: project.slug,
                                        label: project.name,
                                        icon: "project",
                                    })),
                                    {
                                        icon: "plus",
                                        value: 'new_project',
                                        label: "Create New Project",
                                    }
                                ]}/>
                                <div className="MarginTop4">
                                    <Button onClick={this.addToProject}>
                                        <span>Add to Project</span>
                                    </Button>
                                    <Button onClick={this.handleModalClose} outline>
                                        <span>Cancel</span>
                                    </Button>
                                </div>
                            </div>}
                            {(!projects.length || createProject) && <Form onSubmit={this.createProjectAndAddToProject}>
                                <h4 className="MarginBottom1">Create new project</h4>
                                <Input icon="project" label="Project Name" field="projectName" value={projectName} onChange={this.handleProjectNameChange} autoComplete="off" autoFocus/>
                                <Card color="light">
                                    <h4 className="MarginBottom1">Project URL Preview</h4>
                                    <div className="LinkText MarginBottom1">https://dashboard.tenderly.dev/project/<span className="SemiBoldText">{formatProjectSlug(projectName)}</span></div>
                                    <div className="MutedText">* Slugs can not be changed later</div>
                                </Card>
                                <div className="MarginTop4">
                                    <Button type="submit" disabled={!projectName}>
                                        <span>Create Project</span>
                                    </Button>
                                    <Button onClick={this.handleModalClose} outline>
                                        <span>Cancel</span>
                                    </Button>
                                </div>
                            </Form>}
                        </div>}
                    </div>}
                </DialogBody>
            </Dialog>
        );
    }
}

PublicContractQuickActionModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    contract: PropTypes.instanceOf(Contract),
    type: PropTypes.oneOf(['add_to_project', 'setup_alerting', 'filter_transactions']),
};


const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        projectsLoaded: state.project.projectsLoaded,
        projects: getDashboardProjects(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicContractQuickActionModal);
