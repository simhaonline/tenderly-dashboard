import React, {Component} from 'react';
import {connect} from "react-redux";

import {Button, Icon, Page, PageHeading} from "../../Elements";
import {getProjectBySlugAndUsername} from "../../Common/Selectors/ProjectSelectors";

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
