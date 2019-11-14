import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {walletActions} from "../../Core/actions";

import {Page, PageHeading} from "../../Elements";
import {ProjectWalletsList} from "../../Components";

class ProjectWalletsPage extends Component {
    componentDidMount() {
        const {project, walletActions} = this.props;

        walletActions.fetchWalletsForProject(project);
    }

    render() {
        const {wallets, project} = this.props;

        return (
            <Page>
                <PageHeading>
                    <h1>Wallets</h1>
                </PageHeading>
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
