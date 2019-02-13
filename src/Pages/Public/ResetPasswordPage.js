import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Container, Page} from "../../Elements";
import {ResetPasswordForm} from "../../Components";

class ResetPasswordPage extends Component {
    handleResetPasswordSubmit = async ({password}) => {
        const {resetCode} = this.props;
        const {actions} = this.props;

        return actions.resetPassword(resetCode, password);
    };

    render() {
        return (
            <Page id="ResetPasswordPage" wholeScreenPage>
                <Container>
                    <ResetPasswordForm onSubmit={this.handleResetPasswordSubmit}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const resetCode = searchParams.get('code') || null;

    return {
        resetCode,
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
)(ResetPasswordPage);
