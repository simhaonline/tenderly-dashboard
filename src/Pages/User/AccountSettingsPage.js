import React, {Component} from 'react';
import {connect} from "react-redux";

import {Page, Container, Card} from "../../Elements";

class AccountSettingsPage extends Component {
    render() {
        const {user} = this.props;

        console.log(user);

        return (
            <Page>
                <Container>
                    <Card>
                        Account
                    </Card>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(
    mapStateToProps,
    null,
)(AccountSettingsPage);
