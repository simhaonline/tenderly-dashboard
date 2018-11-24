import React, {Component} from 'react';
import {connect} from "react-redux";

import {getProject} from "../../Common/Selectors/ProjectSelectors";
import {NetworkTypes} from "../../Common/constants";

import {Container, Page} from "../../Elements";
import {ProjectUsageGraph, ProjectTransactionAnalytics} from "../../Components";

class ProjectUsagePage extends Component {
    render() {
        const {project} = this.props;

        const usageData = {
            totalTransactions: 214,
            lastTransaction: {
                [NetworkTypes.MAIN]: {
                    txHash: '',
                    timestamp: '',
                },
                [NetworkTypes.KOVAN]: {
                    txHash: '',
                    timestamp: '',
                },
            },
            networkTransactions: {
                [NetworkTypes.MAIN]: 23,
                [NetworkTypes.KOVAN]: 191,
            },
            transactions: {
                [NetworkTypes.MAIN]: {
                    successful: 21,
                    failed: 2,
                },
                [NetworkTypes.KOVAN]: {
                    successful: 148,
                    failed: 43,
                },
            },
        };

        return (
            <Page id="ProjectPage">
                <Container>
                    <h1>Usage</h1>
                    <hr/>
                    <ProjectTransactionAnalytics projectId={project.id}/>
                    <ProjectUsageGraph data={usageData}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {id}}} = ownProps;

    return {
        project: getProject(state, id),
    }
};

export default connect(
    mapStateToProps,
    null
)(ProjectUsagePage);
