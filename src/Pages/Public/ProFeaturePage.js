import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {Page, PageHeading} from "../../Elements";
import {AppSidebar} from "../../Components";

class ProFeaturePage extends Component {
    render() {
        const {feature} = this.props;

        return (
            <Fragment>
                <AppSidebar/>
                <Page>
                    <PageHeading>
                        <h1>{feature}</h1>
                    </PageHeading>
                </Page>
            </Fragment>
        );
    }
}

ProFeaturePage.propTypes = {
    feature: PropTypes.oneOf(['alerting', 'analytics', 'private_networks']).isRequired,
};

export default ProFeaturePage;
