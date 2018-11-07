import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {Page, Container} from "../../Elements";

class EventPage extends Component {
    render() {
        return (
            <Page>
                <Container>
                    Event page
                </Container>
            </Page>
        );
    }
}

export default connect(
    null,
    null,
)(EventPage);
