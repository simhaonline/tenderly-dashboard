import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Container, Page} from "../../Elements";
import {AccountRecoveryForm} from "../../Components";

class AccountRecoveryPage extends Component {
    handleRecoverAccountSubmit = async ({email}) => {
        const {actions} = this.props;

        return actions.recoverAccount(email);
    };

    render() {
        return (
            <Page id="AccountRecoveryPage">
                <Container>
                    <AccountRecoveryForm onSubmit={this.handleRecoverAccountSubmit}/>
                </Container>
            </Page>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch),
    }
};

export default connect(
    null,
    mapDispatchToProps
)(AccountRecoveryPage);
