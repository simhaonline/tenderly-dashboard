import React, {Component} from 'react';

import {Panel, PanelHeader, Accordion, PanelContent} from "../../Elements";

import './CliUsageInstructions.scss';

class CliUsageInstructions extends Component {
    state = {
        currentStep: '',
    };

    /**
     * @param {string} step
     */
    setCurrentStep = (step) => {
        this.setState({
            currentStep: step,
        })
    };

    render() {
        const {currentStep} = this.state;

        return (
            <Panel className="CliUsageInstructions">
                <PanelHeader>
                    <h3>Upload via CLI</h3>
                </PanelHeader>
                <PanelContent>
                    <Accordion open={currentStep === 'install_cli'} onToggle={() => this.setCurrentStep('install_cli')}>
                        This is the first step
                    </Accordion>
                </PanelContent>
            </Panel>
        );
    }
}

export default CliUsageInstructions;
