import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {Page} from "../../Elements";
import {AppSidebar, PaidFeatureUpsell} from "../../Components";

class ProFeaturePage extends Component {
    render() {
        const {feature, loggedIn} = this.props;

        return (
            <Fragment>
                <AppSidebar/>
                <Page>
                    <PaidFeatureUpsell feature={feature} loggedIn={loggedIn}/>
                </Page>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {feature, network, hex}}} = ownProps;

    return {
        loggedIn: state.auth.loggedIn,
        feature,
        network,
        hex,
    };
};

export default connect(
    mapStateToProps,
)(ProFeaturePage);
