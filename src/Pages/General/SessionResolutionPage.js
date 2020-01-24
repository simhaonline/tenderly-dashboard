import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {AccountPlan, User} from "../../Core/models";
import {billingActions} from "../../Core/actions";

import {Button, Icon, Page} from "../../Elements";
import GiftIcon from "./giftbox.svg";
import './SessionResolutionPage.scss';

class SessionResolutionPage extends Component {
    state = {
        activating: false,
    };
    acceptGrandfatherPlan = async () => {
        const {billingActions, user, plan} = this.props;
        this.setState({
            activating: true,
        });
        await billingActions.activatePlanForAccount(user, plan);
        this.setState({
            activating: false,
        })
    };

    render() {
        const {activating} = this.state;


        return (
            <Page wholeScreenPage>
                <div className="GrandFatherInfo">
                    <img src={GiftIcon} className='GrandFatherInfo__Image' alt=""/>
                    <h1 className='GrandFatherInfo__Headline'>Tenderly is out of Beta!</h1>
                    <p className='GrandFatherInfo__Description'>To thank you for your support, we have upgraded your account to the Pro plan for the next 90 days.</p>
                     <div>
                         <div className='GrandFatherInfo__ProFeaturesWrapper'>
                             <div className='GrandFatherInfo__ProFeaturesListItem'>
                                 <Icon className='GrandFatherInfo__ProFeaturesListIcon' icon='organization'/>Multiple
                                 Projects
                             </div>
                             <div className='GrandFatherInfo__ProFeaturesListItem'>
                                 <Icon className='GrandFatherInfo__ProFeaturesListIcon' icon='users'/>Collaborators
                             </div>
                             <div className='GrandFatherInfo__ProFeaturesListItem'>
                                 <Icon className='GrandFatherInfo__ProFeaturesListIcon' icon='bar-chart-2'/>Analytics
                             </div>
                             <div className='GrandFatherInfo__ProFeaturesListItem'>
                                 <Icon className='GrandFatherInfo__ProFeaturesListIcon' icon='bell'/> Real-time
                                 Alerting
                             </div>
                             <div className='GrandFatherInfo__ProFeaturesListItem'>
                                 <Icon className='GrandFatherInfo__ProFeaturesListIcon' icon='filter'/>Transaction
                                 Filtering
                             </div>
                             <div className='GrandFatherInfo__ProFeaturesListItem'>
                                 <Icon className='GrandFatherInfo__ProFeaturesListIcon' icon='layers'/>Private Network
                                 Support
                             </div>
                         </div>
                     </div>
                    <Button className="MarginBottom2" size='large' disabled={activating} onClick={this.acceptGrandfatherPlan} color="secondary">
                        <span>Continue</span>
                        <Icon icon='arrow-right'/>
                    </Button>
                </div>
            </Page>
        );
    }
}

SessionResolutionPage.propTypes = {
    user: PropTypes.instanceOf(User),
    plan: PropTypes.instanceOf(AccountPlan),
};

const mapDispatchToProps = (dispatch) => {
    return {
        billingActions: bindActionCreators(billingActions, dispatch),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(SessionResolutionPage);
