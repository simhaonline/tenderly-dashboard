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

import {Page, PageHeading} from "../../Elements";
import {ProjectContentLoader, ProjectWalletsList} from "../../Components";

class ProjectWalletsPage extends Component {
    componentDidMount() {
        const {project, walletActions, walletsLoaded} = this.props;

        if (!walletsLoaded) {
            walletActions.fetchWalletsForProject(project);
        }
    }

    render() {
        const {projectWallets, wallets, walletsLoaded, project} = this.props;

        return (
            <Page>
                <PageHeading>
                    <h1>Wallets</h1>
                </PageHeading>
                {!walletsLoaded && <ProjectContentLoader text="Fetching project wallets..."/>}
                {walletsLoaded && <ProjectWalletsList project={project} projectWallets={projectWallets} wallets={wallets}/>}
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
)(ProjectWalletsPage);
