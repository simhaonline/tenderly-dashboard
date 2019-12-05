import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {analyticsActions} from "../../Core/actions";

import {Container, Page, PageHeading} from "../../Elements";
import {ProjectContentLoader} from "../../Components";

class ProjectAnalyticsWidgetPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        }
    }

    async componentDidMount() {
        const {analyticsActions, project} = this.props;

        const analyticsResponse = await analyticsActions.fetchAnalyticsForProject(project);

        let widgets = [];

        if (analyticsResponse.success) {
            widgets = analyticsResponse.data.widgets;
        }

        this.setState({
            loading: false,
            widgets,
        });
    }

    render() {
        const {project} = this.props;
        const {loading, widgets} = this.state;

        return (
            <Page id="ProjectPage">

                <Container>
                    {loading && <ProjectContentLoader text="Fetching analytics dashboard..."/>}
                    {!loading && <Fragment>
                        <PageHeading>
                            <h1>Analytics</h1>
                        </PageHeading>
                    </Fragment>}
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

const mapDispatchToProps = (dispatch) => {
    return {
        analyticsActions: bindActionCreators(analyticsActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectAnalyticsWidgetPage);
