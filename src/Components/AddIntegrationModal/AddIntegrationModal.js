import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Dialog, DialogBody, DialogHeader, Form, Button, Input} from "../../Elements";
import {SlackConnectButton} from "..";

class AddIntegrationModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            email: '',
            webhookUrl: '',
        };
    }


    handleFormSubmit = () => {
        const {onClose} = this.props;

        this.setState({
            label: '',
            email: '',
            webhookUrl: '',
        });

        onClose();
    };

    handleInputChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    render() {
        const {open, onClose, type} = this.props;
        const {email, webhookUrl, label} = this.state;

        return (
            <Dialog onClose={onClose} open={open}>
                <DialogHeader>
                    <h3>Add Destination</h3>
                </DialogHeader>
                <DialogBody>
                    {type === 'slack' && <div>
                        <p className="MarginBottom4">Add the Tenderly Slack App to your workspace and authorize a specific channel where you will receive alerts from Tenderly.</p>
                        <SlackConnectButton redirectBack/>
                    </div>}
                    {type !== 'slack' && <Form onSubmit={this.handleFormSubmit}>
                        <p className="MarginBottom4"></p>
                        <Input value={label} label="Label" field="label" onChange={this.handleInputChange}/>
                        {type === 'email' && <Input value={email} label="E-mail" field="email" onChange={this.handleInputChange}/>}
                        {type === 'webhook' && <Input value={webhookUrl} label="Webhook URL" field="webhookUrl" onChange={this.handleInputChange}/>}
                        <Button type="submit">
                            <span>Add destination</span>
                        </Button>
                    </Form>}
                </DialogBody>
            </Dialog>
        );
    }
}

AddIntegrationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['email', 'slack', 'webhook']),
    onCreate: PropTypes.func,
};

export default AddIntegrationModal;
