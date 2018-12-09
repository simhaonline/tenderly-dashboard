import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as contractActions from "../../Core/Contract/Contract.actions";

import {areProjectContractsLoaded, getProject} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {Container, Page} from "../../Elements";
import {ProjectSetupGuide, ProjectContractList} from "../../Components";

class ProjectContractsPage extends Component {
    async componentDidMount() {
        const {actions, project, contractsLoaded} = this.props;

        const projectIsSetup = !!project.lastPushAt;

        if (projectIsSetup && !contractsLoaded) {
            await actions.fetchContractsForProject(project.id);
        }
    }

    render() {
        const {project, contracts, contractsLoaded} = this.props;

        const projectIsSetup = !!project.lastPushAt;

        return (
            <Page id="ProjectPage">
                {projectIsSetup && <Container>
                    {contractsLoaded && !!contracts.length && <ProjectContractList contracts={contracts}/>}
                    {contractsLoaded && !contracts.length && <div>No contracts</div>}
                    {!contractsLoaded && <div>
                        Loading...
                    </div>}
                </Container>}
                {!projectIsSetup && <Container>
                    <ProjectSetupGuide project={project}/>
                </Container>}
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}} = ownProps;

    return {
        project: getProject(state, id),
        contracts: getContractsForProject(state, id),
        contractsLoaded: areProjectContractsLoaded(state, id),
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
)(ProjectContractsPage);
