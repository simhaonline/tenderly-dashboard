import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {OSTypes} from "../../Common/constants";

import {contractActions} from "../../Core/actions";

import {Panel, PanelHeader, Accordion, PanelContent, Button, Code} from "../../Elements";

import './CliUsageInstructions.scss';

class CliUsageInstructions extends Component {
    state = {
        currentStep: 'install_cli',
        fetchingContracts: false,
        fetchedContracts: false,
    };

    /**
     * @param {string} step
     */
    setCurrentStep = (step) => {
        this.setState({
            currentStep: step,
        });
    };

    fetchProjectContracts = async () => {
        const {contractActions, project} = this.props;

        this.setState({
            fetchingContracts: true,
        });

        await contractActions.fetchContractsForProject(project);

        this.setState({
            fetchingContracts: false,
            fetchedContracts: true,
        });
    };

    render() {
        const {currentStep, fetchingContracts, fetchedContracts} = this.state;
        const {os, token, project} = this.props;

        return (
            <Panel className="CliUsageInstructions">
                <PanelHeader>
                    <h3>Upload private project via CLI</h3>
                </PanelHeader>
                <PanelContent>
                    <Accordion open={currentStep === 'install_cli'} onToggle={() => this.setCurrentStep('install_cli')} label="Install the CLI" description="Instructions on how to install and setup the Tenderly CLI">
                        <div className="MarginBottom3">
                            {os !== OSTypes.WINDOWS && <p>To get started, we need to first get the Tenderly CLI tool. You can install it via the following command from your terminal.</p>}
                            {os === OSTypes.WINDOWS && <Fragment>
                                <p>To get started, we need to first get the Tenderly CLI tool.</p>
                                <p>You can install it by going to the the <a target="_blank" rel="noopener noreferrer" href={"https://github.com/Tenderly/tenderly-cli/releases"}>GitHub Releases</a> page and downloading the latest binary for Windows and putting in the inside your $PATH.</p>
                            </Fragment>}
                            {os === OSTypes.MAC && <Code copy="brew tap tenderly/tenderly && brew install tenderly">brew tap tenderly/tenderly && brew install tenderly</Code>}
                            {(os === OSTypes.UNIX || os === OSTypes.LINUX) && <Code copy="curl https://raw.githubusercontent.com/Tenderly/tenderly-cli/master/scripts/install-linux.sh | sh">curl https://raw.githubusercontent.com/Tenderly/tenderly-cli/master/scripts/install-linux.sh | sh</Code>}
                            <p className="MarginTop2" >After installing the CLI you need to authenticate via your login token.</p>
                            <Code copy={`tenderly login --authentication-method=token --token=${token}`}>tenderly login --authentication-method=token --token={token}</Code>
                        </div>
                        <div>
                            <Button onClick={() => this.setCurrentStep('init')}>
                                <span>Next</span>
                            </Button>
                        </div>
                    </Accordion>
                    <Accordion open={currentStep === 'init'} onToggle={() => this.setCurrentStep('init')} label="Initialize project" description="How to link your local development project with the dashboard">
                        <div className="MarginBottom3">
                            <p>Go to the root of your smart contract project. Tenderly uses the Truffle build artifacts to track where your contracts have been deployed.</p>
                            <Code>cd {project.slug}</Code>
                            <p className="MarginTop2">Use the init command to link your local project with the dashboard.</p>
                            <Code copy="tenderly init">tenderly init</Code>
                        </div>
                        <div>
                            <Button onClick={() => this.setCurrentStep('push')}>
                                <span>Next</span>
                            </Button>
                        </div>
                    </Accordion>
                    <Accordion open={currentStep === 'push'} onToggle={() => this.setCurrentStep('push')} label="Push project contracts" description="How to upload your contracts and start monitoring them">
                        <div className="MarginBottom3">
                            <p>In order to track your contracts and extract run time data from transactions, we need you to provide us with the contract source code and where the contracts are deployed for the specified network.</p>
                            <Code copy="tenderly push">tenderly push</Code>
                        </div>
                        <div>
                            <Button onClick={this.fetchProjectContracts} disabled={fetchingContracts} outline={fetchedContracts}>
                                <span>Fetch Contracts</span>
                            </Button>
                            {fetchedContracts && <Button to={`${project.getUrlBase()}/contracts`}>
                                <span>Go back to Contracts</span>
                            </Button>}
                        </div>
                    </Accordion>
                </PanelContent>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        os: state.app.os,
        token: state.auth.token,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        contractActions: bindActionCreators(contractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CliUsageInstructions);
