import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    areProjectWalletsLoaded,
    getProjectBySlugAndUsername,
    getProjectWallets
} from "../../Common/Selectors/ProjectSelectors";

import {walletActions} from "../../Core/actions";

import {Page, PageHeading} from "../../Elements";
import {ProjectWalletsList} from "../../Components";

class ProjectWalletsPage extends Component {
    componentDidMount() {
        const {project, walletActions} = this.props;

        walletActions.fetchWalletsForProject(project);
    }

    render() {
        const {wallets, walletsLoaded, project} = this.props;

        console.log(walletsLoaded);

        return (
            <Page>
                <PageHeading>
                    <h1>Wallets</h1>
                </PageHeading>
                {}
                <ProjectWalletsList project={project} wallets={wallets}/>
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
        wallets: [],
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
)(ProjectWalletsPage);
