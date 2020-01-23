import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    areProjectContractsLoaded,
    getProjectBySlugAndUsername
} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {contractActions} from "../../Core/actions";

import {Page, Container, PageHeading, Icon, Button, Panel} from "../../Elements";
import {CliUsageInstructions, AddPublicContractForm, ProjectContentLoader, AddContractMethodPicker} from "../../Components";
import {getAccountPlanForProject} from "../../Common/Selectors/BillingSelectors";
import {UserPlanTypes} from "../../Common/constants";
import PaidFeatureButton from "../../Components/PaidFeatureButton/PaidFeatureButton";
import PanelContent from "../../Elements/Panel/PanelContent";

class ProjectAddContractPage extends Component {
    state = {
        currentMethod: 'verified',
    };

    componentDidMount() {
        const {actions, project, contractsLoaded} = this.props;

        if (!contractsLoaded) {
            actions.fetchContractsForProject(project);
        }
    }

    setCurrentType = (type) => {
        this.setState({currentMethod: type,});
    };

    render() {
        const {contractsLoaded, contracts, project, accountPlan} = this.props;
        const {currentMethod} = this.state;

        return (
            <Page>
                <Container>
                    <PageHeading>
                        <Button outline to={`/${project.owner}/${project.slug}/contracts`}>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>Add Contract</h1>
                    </PageHeading>
                    {!contractsLoaded && <ProjectContentLoader text="Fetching required data"/>}
                    {contractsLoaded && <Fragment>
                        <AddContractMethodPicker onSelect={this.setCurrentType} currentActive={currentMethod}/>
                        {currentMethod === 'verified' && <AddPublicContractForm project={project} contracts={contracts}/>}
                        {currentMethod === 'cli' && <Fragment>
                            {accountPlan.plan.type!== UserPlanTypes.FREE && <CliUsageInstructions project={project}/>}
                            {accountPlan.plan.type === UserPlanTypes.FREE && <Panel>
                                <PanelContent>
                                    <PaidFeatureButton includes='private_contracts' plan={accountPlan}>
                                        Learn More
                                    </PaidFeatureButton>
                                </PanelContent>
                            </Panel>}
                        </Fragment>}
                    </Fragment>}
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {slug, username}}} = ownProps;

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        project,
        contracts: getContractsForProject(state, project.id),
        contractsLoaded: areProjectContractsLoaded(state, project.id),
        accountPlan: getAccountPlanForProject(state, project),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(contractActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectAddContractPage);
