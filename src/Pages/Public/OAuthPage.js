import React, {Component} from 'react';
import {connect} from "react-redux";

import {Page, Container} from "../../Elements";
import {bindActionCreators} from "redux";
import * as authActions from "../../Core/Auth/Auth.actions";

class OAuthPage extends Component {
    componentDidMount() {
        const {service, code} = this.props;

        console.log(service, code);

        if (service && code) {

        }
    }

    render() {
        return (
            <Page wholeScreenPage>
                <Container>
                    Welcome to OAuth
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {service}}, location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const authCode = searchParams.get("code") || null;

    return {
        service,
        code: authCode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OAuthPage);
