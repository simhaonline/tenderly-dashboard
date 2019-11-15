import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    getProjectBySlugAndUsername,
} from "../../Common/Selectors/ProjectSelectors";

import {walletActions} from "../../Core/actions";

import {Button, Icon, Page, PageHeading} from "../../Elements";

class ProjectAddWalletPage extends Component {
    render() {
        const {project} = this.props;

        return (
            <Page>
                <PageHeading>
                    <Button outline to={`/${project.owner}/${project.slug}/wallets`}>
                        <Icon icon="arrow-left"/>
                    </Button>
                    <h1>Add Wallet</h1>
                </PageHeading>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {slug, username}}} = ownProps;

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        project,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        walletActions: bindActionCreators(walletActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectAddWalletPage);
