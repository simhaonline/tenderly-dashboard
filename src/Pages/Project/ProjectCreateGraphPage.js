import React, {Component} from 'react';
import {connect} from "react-redux";

import {Button, Icon, Page, PageHeading, Panel, PanelContent} from "../../Elements";
import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {AnalyticsWidgetChart, GraphPropertiesForm} from "../../Components";
import {bindActionCreators} from "redux";
import {analyticsActions} from "../../Core/actions";

class ProjectCreateGraphPage extends Component {
    state = {
        widgetData: null
    };
    handleGraphUpdate = async (widget) => {
        const {analyticsActions, project} = this.props;

        const response = await analyticsActions.fetchWidgetDataForProject(project,widget)

        if(response.success){
            this.setState({
                widgetData: response.data,
                widget,
            })
        }
    };
    render() {
        const {project} = this.props;
        const {widgetData,widget} = this.state;

        return (
            <Page>
                <PageHeading>
                    <Button outline to={`${project.getUrlBase()}/analytics`}>
                        <Icon icon="arrow-left"/>
                    </Button>
                    <h1>Create Graph</h1>
                </PageHeading>
                <div className="DisplayFlex">
                    <GraphPropertiesForm onUpdate={this.handleGraphUpdate}/>
                    <Panel>
                        {!!widgetData && <AnalyticsWidgetChart dataPoints={widgetData.dataPoints} widget={widget} data={widgetData.data}/>}
                    </Panel>
                </div>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {slug, username}}} = ownProps;

    const project = getProjectBySlugAndUsername(state, slug, username);

    return {
        project,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        analyticsActions: bindActionCreators(analyticsActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectCreateGraphPage);
