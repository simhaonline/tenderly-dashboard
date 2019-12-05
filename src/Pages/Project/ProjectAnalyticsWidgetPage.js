import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

import {analyticsActions} from "../../Core/actions";

import {Button, Container, Icon, Panel, Page, PageHeading} from "../../Elements";
import {ProjectContentLoader} from "../../Components";

class ProjectAnalyticsWidgetPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        }
    }

    async componentDidMount() {
        const {analyticsActions, project, match: {params: {widgetId}}} = this.props;

        const analyticsResponse = await analyticsActions.fetchAnalyticsWidgetForProject(project, widgetId);

        let widget = null;

        if (analyticsResponse.success) {
            widget = analyticsResponse.data.widget;
        }

        this.setState({
            loading: false,
            widget,
        });
    }

    render() {
        const {project} = this.props;
        const {loading, widget} = this.state;

        return (
            <Page id="ProjectPage">
                <Container>
                    {loading && <ProjectContentLoader text="Fetching analytics dashboard..."/>}
                    {!loading && <Fragment>
                        <PageHeading>
                            <Button outline to={`${project.getUrlBase()}/analytics`}>
                                <Icon icon="arrow-left"/>
                            </Button>
                            <h1>{widget.name}</h1>
                        </PageHeading>
                        <Panel>

                        </Panel>
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
