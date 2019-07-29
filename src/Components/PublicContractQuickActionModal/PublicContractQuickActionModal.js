import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Redirect} from "react-router-dom";

import * as projectActions from "../../Core/Project/Project.actions";
import {Contract} from "../../Core/models";

import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";

import {formatProjectSlug} from "../../Utils/Formatters";

import {Dialog, DialogBody, DialogHeader, Input, Form, Button, Select} from "../../Elements";
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
        if (option === 'new_project') {
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
        console.log(field, value);

        this.setState({
            [field]: value,
        });
    };

    createProjectAndAddToProject = async () => {
        const {projectName} = this.state;
        const {actions, contract} = this.props;

        this.setState({
            creatingProject: true,
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

        this.setState({
            redirectTo: `/project/${project.slug}`,
        });
    };

    addToProject = async () => {
        const {selectedProject} = this.state;
        const {actions, contract} = this.props;

        const addResponse = await actions.addVerifiedContractToProject(
            selectedProject,
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

        await actions.fetchProject(selectedProject);

        this.setState({
            redirectTo: `/project/${selectedProject}`,
        });
    };

    render() {
        const {open, type, projectsLoaded, projects} = this.props;
        const {step, createProject, selectedProject, projectName, redirectTo} = this.state;

        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }

        return (
            <Dialog open={open} onClose={this.handleModalClose}>
                <DialogHeader>
                    <h3>
                        {type === 'add_to_project' && <span>Add to Project</span>}
                        {type === 'setup_alerting' && <span>Setup Alerts</span>}
                        {type === 'filter_transactions' && <span>Filter Transactions</span>}
                        <span> | Quick Action</span>
                    </h3>
                </DialogHeader>
                <DialogBody>
                    {step === 'add_to_project' && <div>
                        {!projectsLoaded && <div>
                            <SimpleLoader/>
                        </div>}
                        {projectsLoaded && <div>
                            {!!projects.length && !createProject && <div>
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
                                <div>
                                    <Button onClick={this.addToProject}>
                                        <span>Add to Project</span>
                                    </Button>
                                    <Button onClick={this.handleModalClose} outline>
                                        <span>Cancel</span>
                                    </Button>
                                </div>
                            </div>}
                            {(!projects.length || createProject) && <Form onSubmit={this.createProjectAndAddToProject}>
                                <Input icon="project" label="Project Name" field="projectName" value={projectName} onChange={this.handleProjectNameChange} autoComplete="off" autoFocus/>
                                <div className="SlugPreviewWrapper">
                                    <div className="UrlLabel">Project URL Preview</div>
                                    <div className="UrlPreview">https://dashboard.tenderly.dev/project/<span className="ProjectSlug">{formatProjectSlug(projectName)}</span></div>
                                    <div className="UrlNote">* Slugs can not be changed later</div>
                                </div>
                                <Button type="submit" disabled={!projectName}>
                                    <span>Create Project</span>
                                </Button>
                                <Button onClick={this.handleModalClose} outline>
                                    <span>Cancel</span>
                                </Button>
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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicContractQuickActionModal);
