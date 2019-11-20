import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {Page, PageHeading} from "../../Elements";
import {AppSidebar} from "../../Components";
import {connect} from "react-redux";

class ProFeaturePage extends Component {
    render() {
        const {feature} = this.props;

        return (
            <Fragment>
                <AppSidebar/>
                <Page>
                    <PageHeading>
                        <h1>{feature} qwe</h1>
                    </PageHeading>
                </Page>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
};

export default connect(
    mapStateToProps,
)(ProFeaturePage);
