import React, {Component} from 'react';
import {connect} from "react-redux";

import {Page, Container} from "../../Elements";
import {DashboardProjectsList} from "../../Components";
import {getDashboardProjects} from "../../Common/Selectors/ProjectSelectors";

class DashboardPage extends Component {
    render() {
        const {projects} = this.props;

        return (
            <Page>
                <Container>
                    <DashboardProjectsList projects={projects}/>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: getDashboardProjects(state),
    }
};

export default connect(
    mapStateToProps,
    null
)(DashboardPage);
