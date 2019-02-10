import React, {Component} from 'react';

import {Container, Page} from "../../Elements";

class NotFoundPage extends Component {
    render() {
        return (
            <Page>
                <Container>
                    <h1>404 Page not found</h1>
                </Container>
            </Page>
        )
    }
}

export default NotFoundPage;
