import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from 'classnames';

import MixPanel from "../../Utils/MixPanel";
import {NetworkTypes, OSTypes} from "../../Common/constants";
import * as projectActions from "../../Core/Project/Project.actions";
import * as eventActions from "../../Core/Event/Event.actions";
import * as contractActions from "../../Core/Contract/Contract.actions";

import {Dialog, DialogHeader, DialogBody, Button, Icon, Input, Alert} from "../../Elements";
import {SimpleLoader, NetworkSegmentedPicker} from '..';

import './ProjectSetupGuide.css';

const ProjectSetupType = {
    MANUAL: 'manual',
    CLI: 'cli',
};

const ProjectSetupSteps = {
    [ProjectSetupType.MANUAL]: {
        ADDRESS: 1,
        IMPORTING: 2,
    },
    [ProjectSetupType.CLI]: {
        INSTALL: 1,
        INITIALIZE: 2,
        PUSH: 3,
    },
};

const ImportContractSteps = {
    "request": 0,
    "contract_validation": 1,
    "contract_verify": 2,
    "contract_compile": 3,
    "contract_add": 4,
    "fetching_project": 5,
};

class ProjectSetupGuide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: props.open,
            currentStep: 0,
            setupType: null,
            manualNetwork: NetworkTypes.MAIN,
            manualContractAddress: '',
            addManualContractError: null,
            addingManualContract: false,
            addingManualContractStep: "request",
            verifying: false,
            verifyAttempted: false,
            finishedSetup: false,
        }
    }

    componentDidMount() {
        const {actions, project} = this.props;
        const {dialogOpen} = this.state;

        if (dialogOpen) {
            MixPanel.track('viewed_initial_project_setup');

            if (!project.setupViewed) {
                actions.setProjectSetupViewed(project);
            }
        }
    }

    componentWillUnmount() {
        this.handleImportStreamResponse = () => {};
    }

    handleDialogClose = () => {
        MixPanel.track(`project_setup_close`);

        this.setState({
            dialogOpen: false,
        });
    };

    openDialog = () => {
        const {actions, project} = this.props;

        if (!project.setupViewed) {
            actions.setProjectSetupViewed(project);
        }

        MixPanel.track('pressed_project_setup_button');

        this.setState({
            dialogOpen: true,
            currentStep: 0,
            setupType: null,
            manualNetwork: NetworkTypes.MAIN,
            addManualContractError: null,
            manualContractAddress: '',
            addingManualContract: false,
            addingManualContractStep: "request",
            verifying: false,
            verifyAttempted: false,
            finishedSetup: false,
        });
    };

    selectSetupType = (type) => {
        this.setState({
            setupType: type,
            currentStep: 1,
        });
    };

    handleManualNetworkChange = (value) => {
        this.setState({
            manualNetwork: value,
        });
    };

    handleInputChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    nextStep = () => {
        MixPanel.track(`project_setup_next_step_${this.state.currentStep + 1}`);

        this.setState({
            currentStep: this.state.currentStep + 1,
        });
    };

    previousStep = () => {
        MixPanel.track(`project_setup_previous_step_${this.state.currentStep - 1}`);

        this.setState({
            currentStep: this.state.currentStep - 1,
        });
    };

    verifyProjectPush = async () => {
        const {project, actions, eventActions, contractActions} = this.props;

        this.setState({
            verifying: true,
        });

        MixPanel.track('project_setup_verify_setup');

        const fetchedProject = await actions.fetchProject(project.id);

        const projectSetup = !!fetchedProject.lastPushAt;

        if (projectSetup) {
            MixPanel.track('project_setup_verification_success');

            eventActions.fetchEventsForProject(project.id, 1);
            contractActions.fetchContractsForProject(project.id);
        } else {
            MixPanel.track('project_setup_verification_failed');
        }

        setTimeout(() => {
            this.setState({
                verifying: false,
                verifyAttempted: true,
                finishedSetup: projectSetup,
            });

            if (projectSetup) {
                setTimeout(() => {
                    this.handleDialogClose();
                }, 3000);
            }
        }, 1000);
    };

    handleImportStreamResponse = (data) => {
        this.setState({
            addingManualContractStep: data.step,
            addManualContractError: data.status ? null : 'Error',
        });
    };

    getImportContractStepClass = (step) => {
        const {addingManualContractStep, addManualContractError} = this.state;

        const stepIndex = ImportContractSteps[step];
        const currentStepIndex = ImportContractSteps[addingManualContractStep];

        if (stepIndex === currentStepIndex && addManualContractError) {
            return 'Error';
        }

        if (stepIndex > currentStepIndex && addManualContractError) {
            return '';
        }

        if (stepIndex === (currentStepIndex + 1)) {
            return 'InProgress';
        }

        if (stepIndex <= currentStepIndex) {
            return 'Success';
        }
    };

    handleAddManualContract = async () => {
        const {project, actions, eventActions, contractActions} = this.props;
        const {manualNetwork, manualContractAddress} = this.state;

        if (!manualNetwork || !manualContractAddress) {
            return;
        }

        this.nextStep();

        this.setState({
            addingManualContract: true,
            addingManualContractStep: "request",
            addManualContractError: null,
        });

        const response = await actions.addVerifiedContractToProject(
            project.id,
            manualNetwork,
            manualContractAddress,
            this.handleImportStreamResponse
        );

        if (response.success) {
            await contractActions.fetchContractsForProject(project.id);
            await eventActions.fetchEventsForProject(project.id, 1);
            this.setState({
                addingManualContractStep: "fetching_project",
            });
            setTimeout(async () => {
                await actions.fetchProject(project.id);
            }, 1000);

        } else {
            this.setState({
                addManualContractError: 'There was a problem trying to add your contract from Etherscan. Please try again later or contact our support.',
            });
        }

        this.setState({
            addingManualContract: false,
        });
    };

    render() {
        const {
            dialogOpen,
            currentStep,
            verifying,
            finishedSetup,
            verifyAttempted,
            setupType,
            manualNetwork,
            manualContractAddress,
            addManualContractError,
            addingManualContract
        } = this.state;
        const {label, color, size, outline, project, os} = this.props;

        return (
            <Fragment>
                <Button outline={outline} onClick={this.openDialog} size={size} color={color}>
                    <span>{label}</span>
                </Button>
                <Dialog open={dialogOpen} onClose={this.handleDialogClose} className="SetupProjectDialog" overlayClose={false}>
                    <DialogHeader>
                        {currentStep === 0 && <Fragment>
                            <Icon icon="layers"/>
                            <h3>Project Setup</h3>
                        </Fragment>}
                        {setupType === ProjectSetupType.MANUAL && currentStep === 1 && <Fragment>
                            <Icon icon="file-text"/>
                            <h3>Contract</h3>
                        </Fragment>}
                        {setupType === ProjectSetupType.MANUAL && currentStep === 2 && <Fragment>
                            <Icon icon="check-square"/>
                            <h3>Contract added</h3>
                        </Fragment>}
                        {setupType === ProjectSetupType.CLI && currentStep === 1 && <Fragment>
                            <Icon icon="archive"/>
                            <h3>Let's get the right tools</h3>
                        </Fragment>}
                        {setupType === ProjectSetupType.CLI && currentStep === 2 && <Fragment>
                            <Icon icon="settings"/>
                            <h3>Now to setup the project</h3>
                        </Fragment>}
                        {setupType === ProjectSetupType.CLI && currentStep === 3 && <Fragment>
                            <Icon icon="upload-cloud"/>
                            <h3>Start monitoring</h3>
                        </Fragment>}
                    </DialogHeader>
                    <DialogBody>
                        <div className="DialogStepsWrapper">
                            <div className={classNames(
                                "DialogStepWrapper",
                                {
                                    "Previous": currentStep > 0,
                                    "Active": currentStep === 0,
                                }
                            )}>
                                <div className="StepContent">
                                    <div className="ProjectSetupPickerWrapper">
                                        <div className="ProjectSetupItem" onClick={() => this.selectSetupType(ProjectSetupType.MANUAL)}>
                                            <div className="IconWrapper">
                                                <Icon icon="file-text"/>
                                            </div>
                                            <div className="SetupTypeName">Verified Contract</div>
                                            <div className="SetupTypeDescription">If your contract is publicly verified on Etherscan, you can enter the contract address and start monitoring it in the dashboard.</div>
                                        </div>
                                        <div className="ProjectSetupItem" onClick={() => this.selectSetupType(ProjectSetupType.CLI)}>
                                            <div className="IconWrapper">
                                                <Icon icon="terminal"/>
                                            </div>
                                            <div className="SetupTypeName">CLI</div>
                                            <div className="SetupTypeDescription">Upload your Smart Contract using our CLI tool that reads your Truffle build to setup monitoring for your deployed contracts.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="StepActions">
                                    <Button onClick={this.handleDialogClose} outline color="secondary">
                                        <span>Setup project later</span>
                                    </Button>
                                </div>
                            </div>
                            <div className={classNames(
                                "DialogStepWrapper",
                                {
                                    "Previous": setupType === ProjectSetupType.MANUAL && currentStep > 1,
                                    "Active": setupType === ProjectSetupType.MANUAL && currentStep === 1,
                                    "Next": currentStep < 1,
                                }
                            )}>
                                <div className="StepContent">
                                    <div className="ManualContractForm">
                                        <p>Select the network your contract is deployed on:</p>
                                        <NetworkSegmentedPicker value={manualNetwork} onChange={this.handleManualNetworkChange} className="ContractNetworkPicker"/>
                                        <p>In order for your contract to be monitored for errors the contract must be publicly verified on <a href="https://etherscan.io/contractsVerified" target="_blank" rel="noopener noreferrer">Etherscan</a>.</p>
                                        <Input value={manualContractAddress} placeholder="0x1A77CC30E8d7Cb528520cda6B29279E7D859896A" icon="file-text" field="manualContractAddress" onChange={this.handleInputChange}/>
                                        <p>If your contract is not verified on Etherscan you can upload your project using our CLI tool. Follow the instructions for setup via CLI <a onClick={() => this.selectSetupType(ProjectSetupType.CLI)}>here</a>.</p>
                                    </div>
                                </div>
                                <div className="StepActions">
                                    <Button onClick={this.handleDialogClose} outline color="secondary">
                                        <span>Cancel</span>
                                    </Button>
                                    <Button disabled={!manualContractAddress} color="secondary" onClick={this.handleAddManualContract}>
                                        <span>Add contract</span>
                                    </Button>
                                </div>
                            </div>
                            <div className={classNames(
                                "DialogStepWrapper",
                                {
                                    "Previous": setupType === ProjectSetupType.MANUAL && currentStep > 2,
                                    "Active": setupType === ProjectSetupType.MANUAL && currentStep === 2,
                                    "Next": currentStep < 2,
                                }
                            )}>
                                <div className="StepContent">
                                    <div className="AddingContractLoader">
                                        <div className="AddingContractStepsWrapper">
                                            <div className={classNames(
                                                "AddingContractStep",
                                                this.getImportContractStepClass('contract_validation'),
                                            )}>
                                                <div className="StepIcon">
                                                    <Icon icon="file-text"/>
                                                </div>
                                                <div className="StepLabel">Checking if contract is valid</div>
                                                {this.getImportContractStepClass('contract_validation') === 'InProgress' && <div className="StepProgress">
                                                    <SimpleLoader/>
                                                </div>}
                                            </div>
                                            <div className={classNames(
                                                "AddingContractStep",
                                                this.getImportContractStepClass('contract_verify'),
                                            )}>
                                                <div className="StepIcon">
                                                    <Icon icon="globe"/>
                                                </div>
                                                <div className="StepLabel">
                                                    Verified on Etherscan
                                                </div>
                                                {this.getImportContractStepClass('contract_verify') === 'InProgress' && <div className="StepProgress">
                                                    <SimpleLoader/>
                                                </div>}
                                            </div>
                                            <div className={classNames(
                                                "AddingContractStep",
                                                this.getImportContractStepClass('contract_compile'),
                                            )}>
                                                <div className="StepIcon">
                                                    <Icon icon="cpu"/>
                                                </div>
                                                <div className="StepLabel">
                                                    Compiling source code
                                                </div>
                                                {this.getImportContractStepClass('contract_compile') === 'InProgress' && <div className="StepProgress">
                                                    <SimpleLoader/>
                                                </div>}
                                            </div>
                                            <div className={classNames(
                                                "AddingContractStep",
                                                this.getImportContractStepClass('contract_add'),
                                            )}>
                                                <div className="StepIcon">
                                                    <Icon icon="download"/>
                                                </div>
                                                <div className="StepLabel">
                                                    Import contract to project
                                                </div>
                                                {this.getImportContractStepClass('contract_add') === 'InProgress' && <div className="StepProgress">
                                                    <SimpleLoader/>
                                                </div>}
                                            </div>
                                            <div className={classNames(
                                                "AddingContractStep",
                                                this.getImportContractStepClass('fetching_project'),
                                            )}>
                                                <div className="StepIcon">
                                                    <Icon icon="single-project"/>
                                                </div>
                                                <div className="StepLabel">
                                                    Fetch project data
                                                </div>
                                                {this.getImportContractStepClass('fetching_project') === 'InProgress' && <div className="StepProgress">
                                                    <SimpleLoader/>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="StepActions">
                                    <Button onClick={this.handleDialogClose} outline color="secondary">
                                        <span>Cancel</span>
                                    </Button>
                                    <Button disabled={addingManualContract || !addManualContractError} color="secondary" onClick={this.previousStep}>
                                        {addingManualContract && <span>Adding contract</span>}
                                        {!addingManualContract && addManualContractError && <span>Try Again</span>}
                                        {!addingManualContract && !addManualContractError && <span>Success</span>}
                                    </Button>
                                </div>
                            </div>
                            <div className={classNames(
                                "DialogStepWrapper",
                                {
                                    "Previous": setupType === ProjectSetupType.CLI && currentStep > 1,
                                    "Active": setupType === ProjectSetupType.CLI && currentStep === 1,
                                    "Next": currentStep < 1,
                                }
                            )}>
                                <div className="StepContent">
                                    {os !== OSTypes.WINDOWS && <p>To get started, we need to first get the Tenderly CLI tool. You can install it via the following command from your terminal.</p>}
                                    {os === OSTypes.WINDOWS && <Fragment>
                                        <p>To get started, we need to first get the Tenderly CLI tool.</p>
                                        <p>You can install it by going to the the <a target="_blank" rel="noopener noreferrer" href={"https://github.com/Tenderly/tenderly-cli/releases"}>GitHub Releases</a> page and downloading the latest binary for Windows and putting in the inside your $PATH.</p>
                                    </Fragment>}
                                    {os === OSTypes.MAC && <code>brew tap tenderly/tenderly && brew install tenderly</code>}
                                    {(os === OSTypes.UNIX || os === OSTypes.LINUX) && <code>curl https://raw.githubusercontent.com/Tenderly/tenderly-cli/master/scripts/install-linux.sh | sh</code>}
                                    <p>After installing the CLI you need to authenticate via your account email and password.</p>
                                    <code>tenderly login</code>
                                </div>
                                <div className="StepActions">
                                    <Button onClick={this.handleDialogClose} outline color="secondary">
                                        <span>Cancel</span>
                                    </Button>
                                    <Button onClick={this.nextStep} color="secondary">
                                        <span>Next step</span>
                                    </Button>
                                </div>
                            </div>
                            <div className={classNames(
                                "DialogStepWrapper",
                                {
                                    "Previous": setupType === ProjectSetupType.CLI && currentStep > 2,
                                    "Active": setupType === ProjectSetupType.CLI && currentStep === 2,
                                    "Next": currentStep < 2,
                                }
                            )}>
                                <div className="StepContent">
                                    <p>Go to the root of your smart contract project. Tenderly uses the Truffle framework to track where your contracts have been deployed.</p>
                                    <code>cd {project.id}</code>
                                    <p>Use the init command to link your local project with the dashboard.</p>
                                    <code>tenderly init</code>
                                    <p>You can read more about <a target="_blank" rel="noopener noreferrer" href="https://docs.tenderly.dev/#/how-tenderly-integrates">how Tenderly integrates with Truffle</a> in this link.</p>
                                </div>
                                <div className="StepActions">
                                    <Button onClick={this.handleDialogClose} outline color="secondary">
                                        <span>Cancel</span>
                                    </Button>
                                    <Button onClick={this.nextStep} color="secondary">
                                        <span>Next</span>
                                    </Button>
                                </div>
                            </div>
                            <div className={classNames(
                                "DialogStepWrapper",
                                {
                                    "Active": setupType === ProjectSetupType.CLI && currentStep === 3,
                                    "Next": currentStep < 3,
                                }
                            )}>
                                <div className="StepContent">
                                    <p>In order to track your contracts and map failed transactions to a specific line of code, we need you to provide us with the contract source code and where the contracts are deployed for the specified network.</p>
                                    <code>tenderly push</code>
                                    <p>You can read more about pushing contracts in the <a rel="noopener noreferrer" href="https://docs.tenderly.dev/#/commands/push" target="_blank">push command</a> documentation page.</p>
                                    {!verifying && verifyAttempted && !finishedSetup && <div className="ActionMessage Warning">
                                        <span>Whooops! Seems that your contracts have not been uploaded yet.</span>
                                    </div>}
                                    {finishedSetup && <div className="ActionMessage Success">
                                        Success. Your contracts have been uploaded and are being tracked!
                                    </div>}
                                </div>
                                <div className="StepActions">
                                    <Button onClick={this.handleDialogClose} outline color="secondary">
                                        <span>Do this later</span>
                                    </Button>
                                    <Button onClick={this.verifyProjectPush} color="secondary" disabled={verifying || finishedSetup}>
                                        {verifying && <Icon icon="circle" className="VerifyIcon"/>}
                                        {verifying && <span>Verifying</span>}
                                        {!verifying && <span>Finish setup</span>}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {setupType !== null && <div className="DialogStepProgress">
                            {Object.values(ProjectSetupSteps[setupType]).map(step =>
                                <div key={step} className={classNames("DialogStepProgressItem", {"Active": currentStep === step,})}/>
                            )}
                        </div>}
                    </DialogBody>
                </Dialog>
            </Fragment>
        );
    }
}

ProjectSetupGuide.defaultProps = {
    open: false,
    label: 'Setup Project',
    size: 'default',
    color: 'primary',
    outline: true,
};

const mapStateToProps = state => {
    return {
        os: state.app.os,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
        eventActions: bindActionCreators(eventActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectSetupGuide);
