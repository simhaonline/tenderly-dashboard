import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {NetworkTypes} from "../../Common/constants";

import * as publicContractsActions from '../../Core/PublicContracts/PublicContracts.actions';
import {Page, Sidebar} from "../../Elements";

class PublicContractsPage extends Component {
    componentDidMount() {
        const {actions} = this.props;

        actions.fetchPublicContracts(NetworkTypes.KOVAN, 0);
    }
    render() {
        return (
            <Page>
                <Sidebar>
                    testing the sidebar
                </Sidebar>
                PublicContractsPage
            </Page>
        )
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(publicContractsActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublicContractsPage);
