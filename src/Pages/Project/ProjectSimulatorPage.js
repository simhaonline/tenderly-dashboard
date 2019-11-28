import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {areProjectContractsLoaded, getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {contractActions} from "../../Core/actions";

import {Page, PageHeading} from "../../Elements";
import {ContractSimulator, ProjectContentLoader} from "../../Components";

class ProjectSimulatorPage extends Component {
    async componentDidMount() {
        const {actions, project, contractsLoaded} = this.props;

        if (!contractsLoaded) {
            await actions.fetchContractsForProject(project);
        }
    }

    render() {
        const {contractsLoaded, contracts, project} = this.props;

        return (
            <Page>
                <PageHeading>
                    <h1>Simulator</h1>
                </PageHeading>
                {!contractsLoaded && <ProjectContentLoader text="Fetching project contracts..."/>}
                {contractsLoaded && <ContractSimulator contracts={contracts} project={project}/>}
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
)(ProjectSimulatorPage);
