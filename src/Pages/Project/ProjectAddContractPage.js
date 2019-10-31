import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    areProjectContractsLoaded,
    getProjectBySlugAndUsername
} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";

import {contractActions} from "../../Core/actions";

import {Page, Container, PageHeading, Icon, Button, CardsWrapper, Card} from "../../Elements";
import {CliUsageInstructions, AddPublicContractForm, ProjectContentLoader} from "../../Components";

class ProjectAddContractPage extends Component {
    state = {
        currentType: 'verified',
    };

    componentDidMount() {
        const {actions, project, contractsLoaded} = this.props;

        if (!contractsLoaded) {
            actions.fetchContractsForProject(project);
        }
    }

    setCurrentType = (type) => {
        this.setState({currentType: type,});
    };

    render() {
        const {contractsLoaded, project} = this.props;
        const {currentType} = this.state;

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
                        <CardsWrapper horizontal className="MarginBottom4">
                            <Card selectable onClick={() => this.setCurrentType('verified')} selected={currentType === 'verified'}>
                                <Icon icon="compass"/>
                                <div>Import Verified</div>
                            </Card>
                            <Card selectable onClick={() => this.setCurrentType('cli')} selected={currentType === 'cli'}>
                                <Icon icon="terminal"/>
                                <div>CLI Upload</div>
                            </Card>
                            <Card selectable onClick={() => this.setCurrentType('folder')} selected={currentType === 'folder'}>
                                <Icon icon="folder"/>
                                <div>Upload Folder</div>
                            </Card>
                            <Card selectable onClick={() => this.setCurrentType('superblocks')} selected={currentType === 'superblocks'} highlightColor="secondary">
                                <Icon icon="box"/>
                                <div>SuperBlocks</div>
                            </Card>
                        </CardsWrapper>
                        {currentType === 'verified' && <AddPublicContractForm/>}
                        {currentType === 'cli' && <CliUsageInstructions/>}
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
