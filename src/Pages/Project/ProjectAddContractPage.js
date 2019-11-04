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
import {CliUsageInstructions, AddPublicContractForm, ProjectContentLoader, AddContractMethodPicker} from "../../Components";

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
        const {contractsLoaded, contracts, project} = this.props;
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
                        {currentMethod === 'cli' && <CliUsageInstructions/>}
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
