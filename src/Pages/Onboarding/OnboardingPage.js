import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Page, Container, Icon} from "../../Elements";

import './OnboardingPage.css';

class OnboardingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 'asd',
        };
    }

    handleSkipOnboarding = () => {
        const {actions} = this.props;

        actions.completeOnboarding();
    };

    render() {
        const {auth} = this.props;

        if (auth.onboardingFinished) {
            return <Redirect to="/dashboard"/>
        }

        return (
            <Page id="OnboardingPage" wholeScreenPage>
                <Container>
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
