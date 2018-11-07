import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as contractActions from "../../Core/Contract/Contract.actions";

import {areProjectContractsLoaded, getProject} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page} from "../../Elements";
import ProjectContractList from "../../Components/ProjectContractList/ProjectContractList";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

class ProjectContractsPage extends Component {
    async componentDidMount() {
        const {actions, project, contractsLoaded} = this.props;

        if (!contractsLoaded) {
            await actions.fetchContractsForProject(project.id);
        }
    }

    render() {
        const {contracts, contractsLoaded} = this.props;

        return (
            <Page id="ProjectPage">
                <Container>
                    {contractsLoaded && !!contracts.length && <ProjectContractList contracts={contracts}/>}
                    {contractsLoaded && !contracts.length && <div>No contracts</div>}
                    {!contractsLoaded && <div>
                        Loading...
                    </div>}
                </Container>
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
