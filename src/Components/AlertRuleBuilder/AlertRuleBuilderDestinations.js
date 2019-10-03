import React, {Component} from 'react';

import {NotificationDestinationTypes, SimpleAlertRuleTypes} from "../../Common/constants";

import {Alert, Card, Toggle, Button} from "../../Elements";
import {DestinationInformation, SlackIcon} from "..";

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";

class AlertRuleBuilderDestinations extends Component {
    isStepCompleted = () => {
        const {selected} = this.props;

        return selected && selected.length > 0;
    };

    getStepDescription = () => {
        const {selected} = this.props;

        if (this.isStepCompleted()) {
            return selected.length === 1 ? '1 destination selected' : `${selected.length} destinations selected`;
        }

        return "Select the destinations to which the alert notifications will be sent to.";
    };

    render() {
        const {destinations, selected, alertType, onSelect, onToggle, number, isActiveStep, project} = this.props;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Destinations"
                                  description={this.getStepDescription()} open={isActiveStep} completed={this.isStepCompleted()}>
                {destinations.map(destination => <Card key={destination.id} onClick={() => onSelect(destination)}
                                                       disabled={alertType === SimpleAlertRuleTypes.SUCCESSFUL_TX && destination.type === NotificationDestinationTypes.SLACK}
                                                       color="light" className="DisplayFlex AlignItemsCenter" clickable>
                    <Toggle value={selected.includes(destination.id)}/>
                    <div className="MarginLeft2">
                        <div className="SemiBoldText">{destination.label}</div>
                        <div className="MutedText">
                            <DestinationInformation destination={destination}/>
                        </div>
                    </div>
                </Card>)}
                <Alert color="info">
                    <div>Integrations are managed on an account level. If you wish to add another destination like a Slack channel, go to the Destinations tabs on the left.</div>
                    <div className="MarginTop2">
                        <Button size="small" to={`/${project.owner}/${project.slug}/alerts/destinations`}>
                            <SlackIcon size={14}/>
                            <span className="MarginLeft1">Integrate Slack</span>
                        </Button>
                    </div>
                </Alert>
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderDestinations.propTypes = {};

export default AlertRuleBuilderDestinations;
