import React, {Component} from 'react';
import {connect} from "react-redux";

import {Page, PageHeading} from "../../Elements";

class ProjectEventsPage extends Component {
    render() {
        return (
            <Page>
                <PageHeading>
                    <h1>Events / Logs</h1>
                </PageHeading>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(
    mapStateToProps,
)(ProjectEventsPage);
