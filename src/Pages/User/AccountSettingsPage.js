import React, {Component} from 'react';
import {connect} from "react-redux";

import {Page, Container, Card} from "../../Elements";
import {FeatureFlagTypes} from "../../Common/constants";
import {PageSegmentSwitcher} from "../../Components";

const SettingsSegments = [
    {
        label: 'General',
        value: 'general',
    },
    {
        label: 'Security',
        value: 'security',
    },
    {
        label: 'Billing',
        value: 'billing',
        featureFlag: FeatureFlagTypes.BILLING,
    },
];

class AccountSettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSegment: 'general',
        }
    }

    /**
     * @param {String} segment
     */
    handleSegmentSwitch = (segment) => {
        this.setState({
            currentSegment: segment,
        });
    };

    render() {
        const {currentSegment} = this.state;
        const {user} = this.props;

        return (
            <Page>
                <Container>
                    <div>
                        <PageSegmentSwitcher current={currentSegment} options={SettingsSegments} onSelect={this.handleSegmentSwitch}/>
                    </div>
                    <div>
                        <Card>
                            Account
                            <div>{user.firstName} {user.lastName}</div>
                            {user.username}
                        </Card>
                    </div>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(
    mapStateToProps,
    null,
)(AccountSettingsPage);
