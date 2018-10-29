import React, {Component} from 'react';
import {connect} from "react-redux";

import {getProject} from "../../Common/Selectors/ProjectSelectors";

import {Container, Page} from "../../Elements";
import {ProjectUsageGraph} from "../../Components";

class ProjectUsagePage extends Component {
    render() {
        return (
            <Page id="ProjectPage">
                <Container>
                    <h1>Usage</h1>
                    <ProjectUsageGraph/>
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
