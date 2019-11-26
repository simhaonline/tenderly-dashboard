import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Plan, User} from "../../Core/models";

import {Button, LinkButton, Page} from "../../Elements";

class SessionResolutionPage extends Component {
    render() {
        const {user, plan} = this.props;

        console.log(user, plan);

        return (
            <Page wholeScreenPage>
                <div className="DisplayFlex FlexDirectionColumn AlignItemsCenter JustifyContentCenter">

                    <Button className="MarginBottom2" color="secondary">Accept Grandfathering</Button>
                    <LinkButton>Decline, downgrade to the Free Version</LinkButton>
                </div>
            </Page>
        );
    }
}

SessionResolutionPage.propTypes = {
    user: PropTypes.instanceOf(User),
    plan: PropTypes.instanceOf(Plan),
};

export default SessionResolutionPage;
