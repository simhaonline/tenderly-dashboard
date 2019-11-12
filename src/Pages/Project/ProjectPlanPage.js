import React, {Component} from 'react';

import {Page, PageHeading, Panel, PanelContent, PanelHeader} from "../../Elements";

class ProjectPlanPage extends Component {
    render() {
        return (
            <Page>
                <PageHeading>
                    <h1>Plan</h1>
                </PageHeading>
                <Panel>
                    <PanelHeader>
                        <h3>Subscription</h3>
                    </PanelHeader>
                    <PanelContent>

                    </PanelContent>
                </Panel>
            </Page>
        );
    }
}

export default ProjectPlanPage;
