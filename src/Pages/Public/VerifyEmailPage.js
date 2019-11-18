import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {authActions} from "../../Core/actions";

import {Container, Page} from "../../Elements";
import {CircularLoader} from "../../Components";

class VerifyEmailPage extends Component {
    state = {
        verified: false,
    };

    async componentDidMount() {
        const {code, authActions} = this.props;

        if (!code) {
            return this.setState({
                error: "Invalid code for verifying your e-mail. Please check your e-mail and try again."
            });
        }

        const response = await authActions.verifyUserEmail(code);

        console.log(response);
    }

    render() {
        const {code} = this.props;
        const {verified} = this.state;


        return (
            <Page>
                <Container className="DisplayFlex JustifyContentCenter">
                    <div className="Padding4">
                        {!verified && <Fragment>
                            <CircularLoader/>
                            <div>Verifying E-mail</div>
                        </Fragment>}
                        {code}
                    </div>
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const code = searchParams.get('code') || null;

    return {
        code,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VerifyEmailPage);
