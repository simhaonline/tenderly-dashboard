import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Helmet} from "react-helmet";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Page, Container} from "../../Elements";
import {OnboardingWelcomeStep, OnboardingCreateOrganizationStep, OnboardingCreateProjectStep} from "../../Components";

import './OnboardingPage.scss';
import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import OnboardingSetUsernameStep from "../../Components/Onboarding/OnboardingSetUsernameStep";

const OnboardingPageSteps = {
    HOME: 'HOME',
    SET_USERNAME: 'SET_USERNAME',
    INSTALL_CLI: 'INSTALL_CLI',
    CREATE_PROJECT: 'CREATE_PROJECT',
    CREATE_ORGANIZATION: 'CREATE_ORGANIZATION',
};

class OnboardingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: props.auth.usernameSet ? OnboardingPageSteps.HOME : OnboardingPageSteps.SET_USERNAME,
            cliInstalled: false,
            usernameSet: false,
            projectCreated: false,
            organizationCreated: false,
        };

        initializeForm(this, {
            projectName: '',
            organizationName: '',
        });

        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleSkipOnboarding = () => {
        const {actions} = this.props;

        actions.completeOnboarding();
    };

    render() {
        const {auth} = this.props;
        const {step} = this.state;

        if (auth.usernameSet) {
            return <Redirect to="/dashboard"/>
        }

        return (
            <Page id="OnboardingPage">
                <Helmet>
                    <title>Onboarding | Tenderly</title>
                </Helmet>
                <Container>
                    {step === OnboardingPageSteps.HOME && <OnboardingWelcomeStep user={auth.user}/>}
                    {step === OnboardingPageSteps.SET_USERNAME && <OnboardingSetUsernameStep/>}
                    {step === OnboardingPageSteps.CREATE_PROJECT && <OnboardingCreateProjectStep/>}
                    {step === OnboardingPageSteps.CREATE_ORGANIZATION && <OnboardingCreateOrganizationStep/>}
                    {/*<div className="SkipButton" onClick={this.handleSkipOnboarding}>*/}
                        {/*<span>Skip</span>*/}
                        {/*<Icon icon="arrow-right"/>*/}
                    {/*</div>*/}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OnboardingPage);
