import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page} from "../../Elements";
import PageHeading from "../../Elements/Page/PageHeading";
import {areProjectContractsLoaded, getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {getContractsForProject} from "../../Common/Selectors/ContractSelectors";
import Button from "../../Elements/Button/Button";

class ProjectSimulatorPage extends Component {

    render() {
        const {project} = this.props;

        return (
            <Page>
                <PageHeading>
                    <h1>Simulator</h1>
                    <div className="MarginLeftAuto">
                        <Button to={`${project.getUrlBase()}/simulator/new`}>
                            <span>New Simulation</span>
                        </Button>
                    </div>
                </PageHeading>
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

export default connect(
    mapStateToProps,
)(ProjectSimulatorPage);