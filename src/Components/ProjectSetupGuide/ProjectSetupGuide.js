import React, {Component, Fragment} from 'react';
import classNames from 'classnames';

import {Card, Dialog, Button} from "../../Elements";

import './ProjectSetupGuide.css';

class ProjectSetupGuide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            currentStep: 1,
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
        });
    };

    nextStep = () => {
        this.setState({
            currentStep: this.state.currentStep + 1,
        });
    };

    render() {
        const {dialogOpen, currentStep} = this.state;

        return (
            <Fragment>
                <Card className="ProjectSetupGuide">
                    <h2>Project setup</h2>
                    <div className="ProjectSetupWrapper">
                        <Button outline onClick={this.openDialog}>
                            <span>Setup Project</span>
                        </Button>
                    </div>
                </Card>
                <Dialog open={dialogOpen} onClose={this.handleDialogClose} className="SetupProjectDialog" overlayClose={false}>
                    <div className="DialogStepsWrapper">
                        <div className={classNames(
                            "DialogStepWrapper",
                            {
                                "Previous": currentStep > 1,
                                "Active": currentStep === 1,
                            }
                        )}>
                            <h3>Let's get the right tools</h3>
                            <div className="StepContent">
                                <p>install</p>
                                <code>brew update && brew install tenderly</code>
                                <p>login</p>
                                <code>tenderly login</code>
                            </div>
                            <div className="StepActions">
                                <Button onClick={this.handleDialogClose} outline size="small">
                                    <span>Cancel</span>
                                </Button>
                                <Button onClick={this.nextStep} color="secondary" size="small">
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
                            <h3>Now to setup the project</h3>
                            <div className="StepContent">
                                <p>Go into your project</p>
                                <code>cd example-project</code>
                                <p>initalize your poejct</p>
                                <code>tenderly init</code>
                            </div>
                            <div className="StepActions">
                                <Button onClick={this.handleDialogClose} outline size="small">
                                    <span>Cancel</span>
                                </Button>
                                <Button onClick={this.nextStep} color="secondary" size="small">
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
                            <h3>Start monitoring</h3>
                            <div className="StepContent">
                                <code>tenderly push</code>
                            </div>
                            <div className="StepActions">
                                <Button onClick={this.handleDialogClose} outline size="small">
                                    <span>Do this later</span>
                                </Button>
                                <Button onClick={this.nextStep} color="secondary" size="small">
                                    <span>Finish setup</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="DialogStepProgress">
                        <div className={classNames("DialogStepProgressItem", {"Active": currentStep === 1,})}/>
                        <div className={classNames("DialogStepProgressItem", {"Active": currentStep === 2,})}/>
                        <div className={classNames("DialogStepProgressItem", {"Active": currentStep === 3,})}/>
                    </div>
                </Dialog>
            </Fragment>
        );
    }
}

export default ProjectSetupGuide;
