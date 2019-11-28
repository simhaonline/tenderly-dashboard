import React, {Component} from 'react';
import {connect} from "react-redux";

import {Page, PageHeading} from "../../Elements";

class ProjectSimulatorPage extends Component {
    render() {
        return (
            <Page>
                <PageHeading>
                    <h1>Simulator</h1>
                </PageHeading>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectSimulatorPage);
