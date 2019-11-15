import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    areProjectWalletsLoaded,
    getProjectBySlugAndUsername,
    getProjectWallets
} from "../../Common/Selectors/ProjectSelectors";
import {getWalletsForProject} from "../../Common/Selectors/WalletSelectors";

import {walletActions} from "../../Core/actions";

import {Button, Icon, Page, PageHeading} from "../../Elements";

class ProjectWalletPage extends Component {
    componentDidMount() {
        const {project, walletActions, walletsLoaded} = this.props;

        if (!walletsLoaded) {
            walletActions.fetchWalletsForProject(project);
        }
    }

    render() {
        const {project} = this.props;

        return (
            <Page>
                <PageHeading>
                    <Button outline to={`/${project.owner}/${project.slug}/wallets`}>
                        <Icon icon="arrow-left"/>
                    </Button>
                    <h1>Wallet</h1>
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
        walletsLoaded: areProjectWalletsLoaded(state, project.id),
        projectWallets: getProjectWallets(state, project.id),
        wallets: getWalletsForProject(state, project.id),
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
)(ProjectWalletPage);
