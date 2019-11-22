import React, {Component} from 'react';
import {connect} from "react-redux";

import {Page, PageHeading} from "../../Elements";

class ProjectSecurityPage extends Component {
    render() {
        return (
            <Page>
                <PageHeading>
                    <h1>Security</h1>
                </PageHeading>
                <div>

                </div>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(
    mapStateToProps,
)(ProjectSecurityPage);
