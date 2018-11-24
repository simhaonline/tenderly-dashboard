import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Page, Container, Icon} from "../../Elements";
import {OnboardingWelcomeStep, OnboardingCreateOrganizationStep, OnboardingCreateProjectStep} from "../../Components";

import './OnboardingPage.css';
import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

const OnboardingPageSteps = {
    WELCOME: 'WELCOME',
    CREATE_PROJECT: 'CREATE_PROJECT',
    CREATE_ORGANIZATION: 'CREATE_ORGANIZATION',
};

class OnboardingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: OnboardingPageSteps.WELCOME,
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

        if (auth.onboardingFinished) {
            return <Redirect to="/dashboard"/>
        }

        return (
            <Page id="OnboardingPage" wholeScreenPage>
                <Container>
                    {step === OnboardingPageSteps.WELCOME && <OnboardingWelcomeStep user={auth.user}/>}
                    {step === OnboardingPageSteps.CREATE_PROJECT && <OnboardingCreateProjectStep/>}
                    {step === OnboardingPageSteps.CREATE_ORGANIZATION && <OnboardingCreateOrganizationStep/>}
                    <div className="SkipButton" onClick={this.handleSkipOnboarding}>
                        <span>Skip</span>
                        <Icon icon="arrow-right"/>
                    </div>
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
