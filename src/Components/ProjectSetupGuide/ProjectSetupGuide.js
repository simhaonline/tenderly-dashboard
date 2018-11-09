import React, {Component, Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classNames from 'classnames';

import * as projectActions from "../../Core/Project/Project.actions";

import {Dialog, DialogHeader, DialogBody, Button, Icon} from "../../Elements";

import './ProjectSetupGuide.css';

class ProjectSetupGuide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            currentStep: 1,
            verifying: false,
            verifyAttempted: false,
            finishedSetup: false,
        }
    }

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false,
        });
    };

    openDialog = () => {
        this.setState({
            dialogOpen: true,
            currentStep: 1,
            verifying: false,
            verifyAttempted: false,
            finishedSetup: false,
        });
    };

    nextStep = () => {
        this.setState({
            currentStep: this.state.currentStep + 1,
        });
    };

    verifyProjectPush = async () => {
        const {projectId, actions} = this.props;

        this.setState({
            verifying: true,
        });

        const fetchedProject = await actions.fetchProject(projectId);

        setTimeout(() => {
            const projectSetup = !!fetchedProject.lastPushAt;

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

    render() {
        const {dialogOpen, currentStep, verifying, finishedSetup, verifyAttempted} = this.state;
        const {label, color, size, outline} = this.props;

        return (
            <Fragment>
                <Button outline={outline} onClick={this.openDialog} size={size} color={color}>
                    <span>{label}</span>
                </Button>
                <Dialog open={dialogOpen} onClose={this.handleDialogClose} className="SetupProjectDialog" overlayClose={false}>
                    <DialogHeader>
                        {currentStep === 1 && <h3>Let's get the right tools</h3>}
                        {currentStep === 2 && <h3>Now to setup the project</h3>}
                        {currentStep === 3 && <h3>Start monitoring</h3>}
                    </DialogHeader>
                    <DialogBody>
                        <div className="DialogStepsWrapper">
                            <div className={classNames(
                                "DialogStepWrapper",
                                {
                                    "Previous": currentStep > 1,
                                    "Active": currentStep === 1,
                                }
                            )}>
                                <div className="StepContent">
                                    <p>install</p>
                                    <code>brew update && brew install tenderly</code>
                                    <p>login</p>
                                    <code>tenderly login</code>
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
                                    "Previous": currentStep > 2,
                                    "Active": currentStep === 2,
                                    "Next": currentStep < 2,
                                }
                            )}>
                                <div className="StepContent">
                                    <p>Go into your project, root of truffle configuration</p>
                                    <code>cd example-project</code>
                                    <p>initalize your poejct</p>
                                    <code>tenderly init</code>
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
                                    "Active": currentStep === 3,
                                    "Next": currentStep < 3,
                                }
                            )}>
                                <div className="StepContent">
                                    <p>In order to track your contracts and map failed transactions to a specific line of code, we need you to provide us with the contract source code and where the contracts are deployed for the specified network.</p>
                                    <code>tenderly push</code>
                                    <p>You can read more about pushing contracts in the <a href="https://docs.tenderly.app/#/commands/push">push command</a> documentation page.</p>
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
                        <div className="DialogStepProgress">
                            <div className={classNames("DialogStepProgressItem", {"Active": currentStep === 1,})}/>
                            <div className={classNames("DialogStepProgressItem", {"Active": currentStep === 2,})}/>
                            <div className={classNames("DialogStepProgressItem", {"Active": currentStep === 3,})}/>
                        </div>
                    </DialogBody>
                </Dialog>
            </Fragment>
        );
    }
}

ProjectSetupGuide.defaultProps = {
    label: 'Setup Project',
    size: 'default',
    color: 'primary',
    outline: true,
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(projectActions, dispatch),
    }
};

export default connect(
    null,
    mapDispatchToProps,
)(ProjectSetupGuide);
