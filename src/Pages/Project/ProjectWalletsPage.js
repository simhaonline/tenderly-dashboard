import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {CollaboratorPermissionTypes, ProjectTypes} from "../../Common/constants";

import {
    areProjectWalletsLoaded,
    getProjectBySlugAndUsername,
    getProjectWallets
} from "../../Common/Selectors/ProjectSelectors";
import {getWalletsForProject} from "../../Common/Selectors/WalletSelectors";

import {walletActions} from "../../Core/actions";

import {Button, Page, PageHeading} from "../../Elements";
import {ExampleProjectInfoModal, PermissionControl, ProjectContentLoader, ProjectWalletsList} from "../../Components";

class ProjectWalletsPage extends Component {
    state = {
        createProjectModalOpen: false,
    };

    componentDidMount() {
        const {project, walletActions, walletsLoaded} = this.props;

        if (!walletsLoaded) {
            walletActions.fetchWalletsForProject(project);
        }
    }

    handleOpenExampleProjectInfoModal = () => {
        this.setState({
            createProjectModalOpen: true,
        });
    };

    handleCloseExampleProjectInfoModal = () => {
        this.setState({
            createProjectModalOpen: false,
        });
    };

    render() {
        const {projectWallets, wallets, walletsLoaded, project} = this.props;
        const {createProjectModalOpen} = this.state;

        return (
            <Page>
                <PageHeading>
                    <h1>Wallets</h1>
                    <div className="MarginLeftAuto">
                        {walletsLoaded && project.type !== ProjectTypes.DEMO &&
                        <PermissionControl project={project}
                                           requiredPermission={CollaboratorPermissionTypes.ADD_CONTRACT}>
                            <Button to={`${project.getUrlBase()}/wallets/add`}>
                                <span>Add Wallet</span>
                            </Button>
                        </PermissionControl>}
                        {walletsLoaded && project.type === ProjectTypes.DEMO && <Fragment>
                            <Button onClick={this.handleOpenExampleProjectInfoModal}>
                                <span>Add Wallet</span>
                            </Button>
                            <ExampleProjectInfoModal header="Example Project" description="This is just an example project to illustrate what the platform can do. If you wish to add a wallet first create a project."
                                                     onClose={this.handleCloseExampleProjectInfoModal} open={createProjectModalOpen}/>
                        </Fragment>}
                    </div>
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
