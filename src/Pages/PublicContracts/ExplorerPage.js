import React, {Component} from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";

import Analytics from "../../Utils/Analytics";

import {Page, Container} from "../../Elements";
import {PublicNetworksSearch, TenderlyLogo, ExplorerDescription, ExplorerRecentSearches, ExplorerHeader} from "../../Components";

import "./ExplorerPage.scss";

class ExplorerPage extends Component {
    async componentDidMount() {
        Analytics.page('Loaded Explore Page');
    }

    handleClearSearches = () => {};

    render() {
        const {recentSearches} = this.props;

        return (
            <Page wholeScreenPage id="ExplorerPage">
                <Helmet>
                    <title>Public Contracts | Tenderly</title>
                    <meta name="description" content="Free Web tutorials"/>
                    <meta name="keywords"
                          content={`smart contracts, public contracts, verified contracts`}/>
                </Helmet>
                <Container className="ExplorerPage__Container">
                    <ExplorerHeader/>
                    <TenderlyLogo className="ExplorerPage__Logo" width={240}/>
                    <PublicNetworksSearch/>
                    {recentSearches.length === 0 && <ExplorerDescription/>}
                    {recentSearches.length !== 0 && <ExplorerRecentSearches searches={recentSearches} onClear={this.handleClearSearches}/>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        recentSearches: state.search.recentSearches,
    }
};

export default connect(
    mapStateToProps,
    null,
)(ExplorerPage);
