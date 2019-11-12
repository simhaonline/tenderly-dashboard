import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink, withRouter} from "react-router-dom";
import _ from 'lodash';

import {Project} from "../../Core/models";

import {Sidebar, Icon} from '../../Elements';

import './AppSidebar.scss';

/**
 * @param {string} url
 * @param {string} base
 * @returns {string|null}
 */
function getContextFromUrl(url, base) {
    const strippedUrl  = url.replace(base, '');

    if (_.startsWith(strippedUrl, '/tx/')) {
        return 'transaction';
    }

    if (_.startsWith(strippedUrl, '/contract/')) {
        return 'contract';
    }

    if (_.startsWith(strippedUrl, '/alerts/')) {
        return 'alerting';
    }

    if (_.startsWith(strippedUrl, '/transactions')) {
        return 'transactions';
    }

    if (_.startsWith(strippedUrl, '/contracts')) {
        return 'contracts';
    }

    if (_.startsWith(strippedUrl, '/plan')) {
        return 'plan';
    }

    return null;
}

const AppSidebarLink = ({to, icon, label, exact = false}) => {
    return (
        <NavLink activeClassName="AppSidebar__NavGroup__Link--Active" to={to} strict={!exact} exact={exact} className="AppSidebar__NavGroup__Link">
            <Icon icon={icon} className="AppSidebar__NavGroup__Link__Icon"/>
            <span className="AppSidebar__NavGroup__Link__Label">{label}</span>
        </NavLink>
    );
};

const AppSidebarSubLink = ({to, label}) => {
    return (
        <NavLink activeClassName="AppSidebar__NavGroup__SubLink--Active" to={to} strict className="AppSidebar__NavGroup__SubLink">
            <span className="AppSidebar__NavGroup__SubLink__Label">{label}</span>
        </NavLink>
    );
};

class AppSidebar extends Component {
    render() {
        const {location: {pathname}, match: {params: {address, network, txHash}}, project} = this.props;

        let routeBase = '';

        if (project) {
            routeBase = project.getUrlBase();
        }

        const context = getContextFromUrl(pathname, routeBase);

        return (
            <Sidebar id="AppSidebar">

                {!!project && <div className="AppSidebar__NavGroup">
                    <div className="AppSidebar__NavGroup__Heading">
                        <span>On-Chain Data</span>
                    </div>
                    <div className="AppSidebar__NavGroup__Links">
                        <AppSidebarLink to={`${routeBase}/transactions`} icon="box" label="Transactions"/>
                        {context === 'transactions' && <div className="MarginBottom1 MarginTop1">
                            <AppSidebarSubLink to={`${routeBase}/transactions`} exact label="All Transactions"/>
                            <AppSidebarSubLink to={`${routeBase}/transactions/filter`} exact label="History"/>
                            <AppSidebarSubLink to={`${routeBase}/transactions/create-filter`} exact label="Create filter"/>
                        </div>}
                        <AppSidebarLink to={`${routeBase}/events`} icon="bookmark" label="Event / Logs"/>
                        <AppSidebarLink to={`${routeBase}/contracts`} icon="file-text" label="Contracts"/>
                        {context === 'contracts' && <div className="MarginBottom1 MarginTop1">
                            <AppSidebarSubLink to={`${routeBase}/contracts`} exact label="All Contracts"/>
                            <AppSidebarSubLink to={`${routeBase}/contracts/create-filter`} exact label="Create filter"/>
                        </div>}
                        <AppSidebarLink to={`${routeBase}/wallets`} icon="inbox" label="Wallets"/>
                    </div>
                </div>}
                {context === 'contract' && <div className="AppSidebar__NavGroup AppSidebar__NavGroup--Context">
                    <div className="AppSidebar__NavGroup__Heading">
                        <span>Contract</span>
                    </div>
                    <div className="AppSidebar__NavGroup__Links">
                        <AppSidebarLink to={`${routeBase}/contract/${network}/${address}`} exact strict={false} icon="box" label="Transactions"/>
                        <AppSidebarLink to={`${routeBase}/contract/${network}/${address}/source`} icon="file-text" label="Source Code"/>
                    </div>
                </div>}
                {context === 'transaction' && <div className="AppSidebar__NavGroup AppSidebar__NavGroup--Context">
                    <div className="AppSidebar__NavGroup__Heading">
                        <span>Transaction</span>
                    </div>
                    <div className="AppSidebar__NavGroup__Links">
                        <AppSidebarLink exact strinct={false} to={`${routeBase}/tx/${network}/${txHash}`} icon="align-right" label="Overview"/>
                        <AppSidebarLink exact strinct={false} to={`${routeBase}/tx/${network}/${txHash}/contracts`} icon="file-text" label="Contracts"/>
                        <AppSidebarLink exact strinct={false} to={`${routeBase}/tx/${network}/${txHash}/logs`} icon="bookmark" label="Events / Logs"/>
                        <AppSidebarLink exact strinct={false} to={`${routeBase}/tx/${network}/${txHash}/state-diff`} icon="code" label="State Changes"/>
                        <AppSidebarLink exact strinct={false} to={`${routeBase}/tx/${network}/${txHash}/debugger`} icon="terminal" label="Debugger"/>
                        <AppSidebarLink exact strinct={false} to={`${routeBase}/tx/${network}/${txHash}/gas-usage`} icon="cpu" label="Gas Profiler"/>
                    </div>
                </div>}

                <div className="AppSidebar__NavGroup AppSidebar__NavGroup--Monitoring">
                    <div className="AppSidebar__NavGroup__Heading">
                        <span>Monitoring</span>
                    </div>
                    <div className="AppSidebar__NavGroup__Links">
                        <AppSidebarLink to={`${routeBase}/analytics`} icon="bar-chart-2" label="Analytics"/>
                        <AppSidebarLink to={`${routeBase}/alerts`} icon="bell" label="Alerting"/>
                        {context === 'alerting' && <div className="MarginTop1">
                            <AppSidebarSubLink to={`${routeBase}/alerts/rules`} label="Alerts"/>
                            <AppSidebarSubLink to={`${routeBase}/alerts/history`} label="History"/>
                            <AppSidebarSubLink to={`${routeBase}/alerts/destinations`} label="Destinations"/>
                        </div>}
                    </div>
                </div>
                {!!project && <div className="AppSidebar__NavGroup">
                    <div className="AppSidebar__NavGroup__Heading">
                        <span>Project</span>
                    </div>
                    <div className="AppSidebar__NavGroup__Links">
                        <AppSidebarLink to={`${routeBase}/collaborators`} icon="users" label="Collaborators"/>
                        <AppSidebarLink to={`${routeBase}/plan`} icon="credit-card" label="Plan"/>
                        {context === 'plan' && <div className="MarginTop1">
                            <AppSidebarSubLink to={`${routeBase}/plan`} exact label="Usage"/>
                            <AppSidebarSubLink to={`${routeBase}/plan/billing-cards`} label="Billing & Cards"/>
                            <AppSidebarSubLink to={`${routeBase}/plan/history`} label="Invoices"/>
                        </div>}
                        <AppSidebarLink to={`${routeBase}/settings`} icon="settings" label="Settings"/>
                    </div>
                </div>}
            </Sidebar>
        );
    }
}

AppSidebar.propTypes = {
    project: PropTypes.instanceOf(Project),
};

export default withRouter(AppSidebar);
