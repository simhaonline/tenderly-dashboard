import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    areProjectWalletsLoaded,
    getProjectBySlugAndUsername,
} from "../../Common/Selectors/ProjectSelectors";

import {walletActions} from "../../Core/actions";

import {Button, Icon, Page, PageHeading} from "../../Elements";
import {AddWalletMethodPicker, ProjectContentLoader} from "../../Components";

class ProjectAddWalletPage extends Component {
    state = {
        currentMethod: 'address',
    };

    componentDidMount() {
        const {project, walletActions, walletsLoaded} = this.props;

        if (!walletsLoaded) {
            walletActions.fetchWalletsForProject(project);
        }
    }

    setCurrentType = (type) => {
        this.setState({currentMethod: type,});
    };

    render() {
        const {project, walletsLoaded} = this.props;
        const {currentMethod} = this.state;

        return (
            <Page>
                <PageHeading>
                    <Button outline to={`/${project.owner}/${project.slug}/wallets`}>
                        <Icon icon="arrow-left"/>
                    </Button>
                    <h1>Add Wallet</h1>
                </PageHeading>
                {!walletsLoaded && <ProjectContentLoader text="Fetching required data"/>}
                {walletsLoaded && <Fragment>
                    <AddWalletMethodPicker onSelect={this.setCurrentType} currentActive={currentMethod}/>
                    {currentMethod === 'address' && <div>address</div>}
                    {currentMethod === 'csv' && <div>csv</div>}
                </Fragment>}
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
