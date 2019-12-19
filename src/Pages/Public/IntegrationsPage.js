import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {CustomIntegrationTypes, LoginFlowTypes} from "../../Common/constants";

import {Page} from "../../Elements";
import {AragonIntegration} from "../../Components";

class IntegrationsPage extends Component {
    render() {
        const {integration, loggedIn, data, invalidParameters} = this.props;

        if (!loggedIn) {
            return <Redirect to={{
                pathname: "/login",
                state: {
                    from: this.props.location,
                    flow: LoginFlowTypes.CUSTOM_INTEGRATION,
                },
            }}/>;
        }

        return (
            <Page id="IntegrationsPage">
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
    } else {
        invalidParameters = true;
    }

    return {
        loggedIn: state.auth.loggedIn,
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
