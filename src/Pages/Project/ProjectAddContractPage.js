import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    areProjectContractsLoaded,
    getProjectBySlugAndUsername
} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {contractActions} from "../../Core/actions";

import {Page, Container, PageHeading, Icon, Button} from "../../Elements";
import {CliUsageInstructions, AddPublicContractForm, ProjectContentLoader} from "../../Components";

class ProjectAddContractPage extends Component {
    componentDidMount() {
        const {actions, project, contractsLoaded} = this.props;

        if (!contractsLoaded) {
            actions.fetchContractsForProject(project);
        }
    }

    render() {
        const {contractsLoaded, project} = this.props;

        return (
            <Page>
                <Container>
                    <PageHeading>
                        <Button outline to={`/${project.owner}/${project.slug}/collaborators`}>
                            <Icon icon="arrow-left"/>
                        </Button>
                        <h1>Add Contract</h1>
                    </PageHeading>
                    {!contractsLoaded && <ProjectContentLoader text="Fetching required data"/>}
                    {contractsLoaded && <Fragment>
                        <CliUsageInstructions/>
                        <AddPublicContractForm/>
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
