import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {CustomIntegrationTypes} from "../../Common/constants";

import {Page} from "../../Elements";
import {AragonIntegration} from "../../Components";

class IntegrationsPage extends Component {
    render() {
        const {integration, data, invalidParameters} = this.props;

        return (
            <Page wholeScreenPage id="IntegrationsPage">
                {invalidParameters && <div>
                    Invalid parameter amigo
                </div>}
                {!invalidParameters && <Fragment>
                    {integration === CustomIntegrationTypes.ARAGON && <AragonIntegration data={data}/>}
                </Fragment>}
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const integration = searchParams.get('integration') || null;

    let integrationData = {};
    let invalidParameters = false;

    if (integration === CustomIntegrationTypes.ARAGON) {
        let contracts = [];

        try {
            contracts = JSON.parse(searchParams.get('contracts'));
        } catch (e) {
            invalidParameters = true;
        }

        integrationData = {
            project: searchParams.get('project') || null,
            network: searchParams.get('network') || null,
            contracts,
        };
    }

    return {
        integration,
        data: integrationData,
        invalidParameters,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(IntegrationsPage);
