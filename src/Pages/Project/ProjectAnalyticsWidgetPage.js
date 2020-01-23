import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {areProjectContractsLoaded, getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {analyticsActions, contractActions} from "../../Core/actions";

import {Button, Container, Icon, Page, PageHeading} from "../../Elements";
import {AnalyticsDataView, FreePlanContractPicker, ProjectContentLoader} from "../../Components";
import {
    areCustomDashboardsLoadedForProject, getAnalyticsDashboardForWidget,
    getCustomDashboardWidgetForProject
} from "../../Common/Selectors/AnalyticsSelectors";
import {getAccountPlanForProject} from "../../Common/Selectors/BillingSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";
import {AnalyticsDataFiltersTypes, UserPlanTypes} from "../../Common/constants";

class ProjectAnalyticsWidgetPage extends Component {
    state = {
        filters: []
    };

    async componentDidMount() {
        const {analyticsActions, project, loadedDashboards, contractsLoaded, contracts, accountPlan, contractActions} = this.props;
        let projectContracts = contracts;

        if (!contractsLoaded) {

            const contractsResponse = await contractActions.fetchContractsForProject(project);
            projectContracts = contractsResponse.data;
        }

        if(accountPlan.plan.type === UserPlanTypes.FREE){
            this.setState({
                filters: [{
                    type: AnalyticsDataFiltersTypes.CONTRACT,
                    value: projectContracts[0].id,
                }]
            })
        }
        if(!loadedDashboards){
            analyticsActions.fetchAnalyticsForProject(project);
        }
    }



    handleSingleContractFilterChange= (contract) => {
        this.setState({
            filters: [{
                type: AnalyticsDataFiltersTypes.CONTRACT,
                value: contract.id,
            }]
        })
    };

    render() {
        const {project, loadedDashboards, analyticsWidget, dashboard, accountPlan, contracts} = this.props;
        const {filters} = this.state;

        return (
            <Page id="ProjectPage">
                <Container>
                    {!loadedDashboards && <ProjectContentLoader text="Fetching analytics dashboard..."/>}
                    {loadedDashboards && <Fragment>
                        <PageHeading>
                            <Button outline to={`${project.getUrlBase()}/analytics`}>
                                <Icon icon="arrow-left"/>
                            </Button>
                            <h1>{analyticsWidget.name}</h1>
                        </PageHeading>
                        {accountPlan.plan.type === UserPlanTypes.FREE && <FreePlanContractPicker accountPlan={accountPlan} project={project}
                                                                                                 contract={contracts.find(contract=> filters.find(filter=> filter.type===AnalyticsDataFiltersTypes.CONTRACT).value===contract.id)}
                                                                                                 onChange={this.handleSingleContractFilterChange}/>}
                        <AnalyticsDataView widget={analyticsWidget} project={project} filters={filters} dashboard={dashboard}/>
                    </Fragment>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug, widgetId}}} = ownProps;
    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        project,
        loadedDashboards: areCustomDashboardsLoadedForProject(state, project.id),
        analyticsWidget: getCustomDashboardWidgetForProject(state, project.id, widgetId),
        dashboard: getAnalyticsDashboardForWidget(state, project.id, widgetId),
        accountPlan: getAccountPlanForProject(state, project),
        contracts: getContractsForProject(state, project.id),
        contractsLoaded: areProjectContractsLoaded(state, project.id),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        analyticsActions: bindActionCreators(analyticsActions, dispatch),
        contractActions: bindActionCreators(contractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectAnalyticsWidgetPage);
