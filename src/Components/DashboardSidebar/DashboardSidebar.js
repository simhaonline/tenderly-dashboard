import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Sidebar} from "../../Elements";

class DashboardSidebar extends Component {
    render() {
        return (
            <Sidebar>
                hahaha

            </Sidebar>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DashboardSidebar);
