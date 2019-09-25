import React, {Component} from 'react';

import {NotificationDestinationTypes, SimpleAlertRuleTypes} from "../../Common/constants";

import {Alert, Card, Toggle, Button} from "../../Elements";
import {DestinationInformation, SlackIcon} from "..";

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";

class AlertRuleBuilderDestinations extends Component {
    render() {
        const {destinations, selected, alertType, onSelect, onToggle, number, isActiveStep} = this.props;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Destinations"
                                  description="No description" open={isActiveStep} completed={false}>
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
                    <div>Integrations are managed on an account level. If you wish to add another destination like a Slack channel, go to the Destinations tabs on the right.</div>
                    <div className="MarginTop2">
                        <Button size="small">
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
