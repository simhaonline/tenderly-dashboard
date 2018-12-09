import React, {Component} from 'react';
import {connect} from "react-redux";

import {Page, Container, Card} from "../../Elements";

class AccountSettingsPage extends Component {
    render() {
        const {user} = this.props;

        return (
            <Page>
                <Container>
                    <Card>
                        Account
                        <div>{user.firstName} {user.lastName}</div>
                        {user.username}
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
