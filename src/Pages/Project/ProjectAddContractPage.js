import React, {Component} from 'react';

import {Page, Container, PageHeading} from "../../Elements";
import {CliUsageInstructions, AddPublicContractForm} from "../../Components";

class ProjectAddContractPage extends Component {
    render() {
        return (
            <Page>
                <Container>
                    <PageHeading>
                        <h1>Add Contract</h1>
                    </PageHeading>
                    <CliUsageInstructions/>
                    <AddPublicContractForm/>
                </Container>
            </Page>
        );
    }
}

export default ProjectAddContractPage;
