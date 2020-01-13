import React, {Component} from 'react';
import {connect} from "react-redux";

import {Button, Icon, Page, PageHeading, Panel, PanelContent} from "../../Elements";
import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";
import {GraphPropertiesForm} from "../../Components";

class ProjectCreateGraphPage extends Component {
    render() {
        const {project} = this.props;

        return (
            <Page>
                <PageHeading>
                    <Button outline to={`${project.getUrlBase()}/analytics`}>
                        <Icon icon="arrow-left"/>
                    </Button>
                    <h1>Create Graph</h1>
                </PageHeading>
                <div className="DisplayFlex">
                    <GraphPropertiesForm/>
                    <Panel>
                        <PanelContent>
                            <Icon icon="pie-chart"/>
                            <span>Select an property to display in the chart</span>
                        </PanelContent>
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

export default connect(
    mapStateToProps,
)(ProjectCreateGraphPage);
