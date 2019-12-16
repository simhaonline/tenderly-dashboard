import React, {Component} from 'react';
import {connect} from "react-redux";

import {Page} from "../../Elements";

class IntegrationsPage extends Component {
    render() {
        return (
            <Page wholeScreenPage id="IntegrationsPage">
                Aloha mi amigole
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
)(IntegrationsPage);
