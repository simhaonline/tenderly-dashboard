import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {Page, Container} from "../../Elements";

class ProjectContractPage extends Component {
    render() {
        return (
            <Page>
                <Container>
                    ProjectContractPage
                </Container>
            </Page>
        );
    }
}

export default connect(
    null,
    null,
)(ProjectContractPage);
