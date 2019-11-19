import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {NotificationDestinationTypes} from "../../Common/constants";

import {Dialog, DialogBody, DialogHeader, DialogLoader, Form, Button, Input} from "../../Elements";
import {SlackConnectButton} from "..";

class AddIntegrationModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            value: '',
            inProgress: false,
        };
    }


    handleFormSubmit = async () => {
        const {onClose, onSubmit, type} = this.props;
        const {label, value} = this.state;

        if (!label || !value) return;

        this.setState({
            inProgress: true,
        });

        const response = await onSubmit({
            type,
            label,
            value,
        });

        this.setState({
            label: '',
            value: '',
            inProgress: false,
        });

        if (response.success) {
            onClose();
        }
    };

    resetModal = () => {
        const {onClose} = this.props;

        this.setState({
            label: '',
            value: '',
            inProgress: false,
        });

        onClose();
    };

    handleInputChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    render() {
        const {open, type} = this.props;
        const {value, inProgress, label} = this.state;

        return (
            <Dialog onClose={this.resetModal} open={open}>
                <DialogHeader>
                    <h3>Add Destination</h3>
                </DialogHeader>
                <DialogBody>
                    {type === NotificationDestinationTypes.SLACK && <div>
                        <p className="MarginBottom4">Add the Tenderly Slack App to your workspace and authorize a specific channel where you will receive alerts from Tenderly.</p>
                        <SlackConnectButton redirectBack/>
                    </div>}
                    {type === NotificationDestinationTypes.EMAIL && <Form onSubmit={this.handleFormSubmit}>
                        <p className="MarginBottom4">Add an e-mail that can receive alert notifications from Tenderly.</p>
                        <Input value={label} autoFocus label="Label" field="label" onChange={this.handleInputChange}/>
                        <Input value={value} label='E-mail' field="value" onChange={this.handleInputChange}/>
                        <Button type="submit">
                            <span>Add destination</span>
                        </Button>
                    </Form>}
                    {type === NotificationDestinationTypes.DISCORD && <Form onSubmit={this.handleFormSubmit}>
                        <p className="MarginBottom4">Insert your Discord channel webhook to receive alerts from Tenderly.</p>
                        <Input value={label} autoFocus label="Label" field="label" onChange={this.handleInputChange}/>
                        <Input value={value} label="Discord Webhook" field="value" onChange={this.handleInputChange}/>
                        <Button type="submit" disabled={!label || !value}>
                            <span>Add destination</span>
                        </Button>
                    </Form>}
                    {inProgress && <DialogLoader/>}
                </DialogBody>
            </Dialog>
        );
    }
}

AddIntegrationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.oneOf(Object.values(NotificationDestinationTypes)),
    onCreate: PropTypes.func,
};

export default AddIntegrationModal;
