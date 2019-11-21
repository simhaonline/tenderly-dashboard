import React, {Component} from 'react';
import {connect} from "react-redux";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {Button, Container, Page, PageHeading} from "../../Elements";
import {ProjectAnalyticsDashboard, ProjectContentLoader} from "../../Components";

import dashboardData from './AnalyticsDashboardData';

class ProjectAnalyticsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false,
            })
        }, 100);
    }

    render() {
        const {project} = this.props;
        const {loading} = this.state;

        return (
            <Page id="ProjectPage">
                <Container>
                    <PageHeading>
                        <h1>Analytics</h1>
                        <div className="MarginLeftAuto">
                            <Button to={`${project.getUrlBase()}/analytics/create`}>
                                Create Graph
                            </Button>
                        </div>
                    </PageHeading>
                    {loading && <ProjectContentLoader text="Fetching analytics dashboard..."/>}
                    {!loading && <ProjectAnalyticsDashboard dashboard={dashboardData}/>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {username, slug}}} = ownProps;

    return {
        project: getProjectBySlugAndUsername(state, slug, username),
    }
};

export default connect(
    mapStateToProps,
    null
)(ProjectAnalyticsPage);
