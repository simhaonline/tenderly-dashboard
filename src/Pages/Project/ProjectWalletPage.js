import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Route, Switch} from "react-router-dom";

import {getNetworkForRouteSlug} from "../../Utils/RouterHelpers";

import {
    areProjectWalletsLoaded,
    getProjectBySlugAndUsername, getProjectWallet,
} from "../../Common/Selectors/ProjectSelectors";
import {getWalletByAddressAndNetwork} from "../../Common/Selectors/WalletSelectors";

import {walletActions} from "../../Core/actions";

import {Button, Container, Icon, Page, PageHeading} from "../../Elements";
import {ProjectContentLoader, WalletGeneralInfo, WalletTokensList, WalletTransactionsList} from "../../Components";

class ProjectWalletPage extends Component {
    constructor(props) {
        super(props);

        const {project, match: {params: {address, network}}} = props;

        const routeBase = `${project.getUrlBase()}/wallet/${network}/${address}`;

        this.state = {
            tabs: [
                {
                    route: `${routeBase}`,
                    label: 'Transactions',
                },
                {
                    route: `${routeBase}/tokens`,
                    label: 'Tokens',
                },
            ],
        };
    }

    componentDidMount() {
        const {project, walletActions, walletsLoaded} = this.props;

        if (!walletsLoaded) {
            walletActions.fetchWalletsForProject(project);
        }
    }

    render() {
        const {project, walletsLoaded, projectWallet, wallet} = this.props;
        const {tabs} = this.state;

        if (!walletsLoaded) {
            return <Page tabs={tabs}>
                <Container>
                    <ProjectContentLoader text="Fetching contract..."/>
                </Container>
            </Page>;
        }

        return (
            <Page tabs={tabs}>
                <Container>
                    <PageHeading>
                        <Button outline to={`/${project.owner}/${project.slug}/wallets`}>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>{projectWallet.name}</h1>
                    </PageHeading>
                    <Switch>
                        <Route path="/:username/:slug/wallet/:network/:address" exact render={() => <Fragment>
                            <WalletGeneralInfo wallet={wallet}/>
                            <WalletTransactionsList transactions={[]}/>
                        </Fragment>}/>
                        <Route path="/:username/:slug/wallet/:network/:address/tokens" exact render={() => <Fragment>
                            <WalletTokensList wallet={wallet}/>
                        </Fragment>}/>
                    </Switch>
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {slug, username, network, address}}} = ownProps;

    const networkType = getNetworkForRouteSlug(network);
    const project = getProjectBySlugAndUsername(state, slug, username);
    const wallet = getWalletByAddressAndNetwork(state, address, networkType);

    return {
        project,
        walletsLoaded: areProjectWalletsLoaded(state, project.id),
        projectWallet: getProjectWallet(state, project.id, wallet),
        wallet,
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
