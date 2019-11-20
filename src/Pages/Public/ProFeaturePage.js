import React, {Component, Fragment} from 'react';

import {Page} from "../../Elements";
import {AppSidebar, PaidFeatureUpsell} from "../../Components";
import {connect} from "react-redux";

class ProFeaturePage extends Component {
    render() {
        const {feature} = this.props;

        return (
            <Fragment>
                <AppSidebar/>
                <Page>
                    <PaidFeatureUpsell feature={feature}/>
                </Page>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {feature, network, hex}}} = ownProps;

    return {
        feature,
        network,
        hex,
    };
};

export default connect(
    mapStateToProps,
)(ProFeaturePage);
