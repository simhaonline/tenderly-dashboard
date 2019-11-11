import React, {Component} from "react";
import {Helmet} from "react-helmet";

import Analytics from "../../Utils/Analytics";

import {Page, Container} from "../../Elements";
import {PublicNetworksSearch, TenderlyLogo, ExplorerDescription, ExplorerHeader} from "../../Components";

import "./ExplorerPage.scss";

class ExplorerPage extends Component {
    async componentDidMount() {
        Analytics.page('Loaded Explore Page');
    }

    render() {
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
                    <ExplorerDescription/>
                </Container>
            </Page>
        )
    }
}

export default ExplorerPage;
