import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link, withRouter} from "react-router-dom";
import moment from "moment";

import {generateShortAddress} from "../../Utils/AddressFormatter";

import * as alertingActions from "../../Core/Alerting/Alerting.actions";

import {NetworkAppToRouteTypeMap, ProjectTypes} from "../../Common/constants";
import {areAlertRulesLoadedForProject, getAlertRulesForProject} from "../../Common/Selectors/AlertingSelectors";

import {Panel, PanelContent, Table} from "../../Elements";
import {NetworkColumn, SimpleLoader} from "..";

const alertHistoryTableConf = [
    {
        label: "Alert",
        renderColumn: (log, metadata) => {
            let rule = metadata.rules.find(rule => rule.id === log.alertRule);
            const {project} = metadata;

            return <div>
                {!!rule && <Link to={`/${project.owner}/${project.slug}/alerts/rules/${rule.id}`}>{rule.name}</Link>}
                {!rule && <span>{log.alertRule}</span>}
            </div>;
        },
    },
    {
        label: "Tx Hash",
        renderColumn: (log, metadata) => {
            const {project} = metadata;

            return <div>
                <Link className="MonospaceFont" to={`/${project.owner}/${project.slug}/tx/${NetworkAppToRouteTypeMap[log.network]}/${log.txHash}`}>{generateShortAddress(log.txHash, 12, 6)}</Link>
            </div>
        },
    },
    {
        label: "When",
        renderColumn: log => <div>
            {moment(log.triggeredAt).format('DD/MM/YYYY HH:mm:ss')}
        </div>,
    },
    {
        label: "Network",
        size: 140,
        renderColumn: log => <NetworkColumn network={log.network}/>,
    },
];

class ProjectAlertHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initiallyLoaded: false,
            loading: false,
            page: 1,
            filters: {},
            alertLogs: [],
        };
    }

    async componentDidMount() {
        const {actions, areRulesLoaded, project} = this.props;
        const {page, filters} = this.state;

        let alertLogs = [];

        if (project.type !== ProjectTypes.DEMO) {
            if (!areRulesLoaded) {
                actions.fetchAlertRulesForProject(project);
            }

            const response = await actions.fetchAlertHistoryforProject(project, filters, page);

            if (response.success) {
                alertLogs = response.data;
            }
        }

        this.setState({
            initiallyLoaded: true,
            alertLogs,
        });
    }

    handlePageChange = (nextPage) => {
        const {actions, project} = this.props;
        const {filters} = this.state;

        this.setState({
            page: nextPage,
        }, async () => {
            this.setState({
                loading: true,
            });

            const response = await actions.fetchAlertHistoryforProject(project, filters, nextPage);

            let alertLogs = [];

            if (response.success) {
                alertLogs = response.data;
            }

            this.setState({
                loading: false,
                alertLogs,
            });
        });
    };

    render() {
        const {areRulesLoaded, rules, project} = this.props;
        const {initiallyLoaded, loading, alertLogs, page} = this.state;

        const hasLoaded = areRulesLoaded && initiallyLoaded;

        return (
            <Fragment>
                {!hasLoaded && <Panel>
                    <PanelContent>
                        <div className="Padding4 DisplayFlex JustifyContentCenter">
                            <SimpleLoader/>
                        </div>
                    </PanelContent>
                </Panel>}
                {hasLoaded && <Table data={alertLogs} emptyStateLabel="No alert history" metadata={{
                    rules,
                    project,
                }} configuration={alertHistoryTableConf} currentPage={page} onPageChange={this.handlePageChange} keyAccessor="txHash" loading={loading}/>}
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {project} = ownProps;

    return {
        project,
        rules: getAlertRulesForProject(state, project.id),
        areRulesLoaded: areAlertRulesLoadedForProject(state, project),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(alertingActions, dispatch),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectAlertHistory));
