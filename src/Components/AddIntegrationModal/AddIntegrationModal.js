import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Dialog, DialogBody, DialogHeader, Form, Button, Input} from "../../Elements";
import {SlackConnectButton} from "..";

class AddIntegrationModal extends Component {
    handleFormSubmit = () => {
        const {onClose} = this.props;

        onClose();
    };

    render() {
        const {open, onClose, type} = this.props;

        return (
            <Dialog onClose={onClose} open={open}>
                <DialogHeader>
                    <h3>Add Integration</h3>
                </DialogHeader>
                <DialogBody>
                    {type === 'slack' && <div>
                        <SlackConnectButton redirectBack/>
                    </div>}
                    {type !== 'slack' && <Form onSubmit={this.handleFormSubmit}>
                        <Input label="Label" field="label"/>
                        {type === 'email' && <Input label="E-mail" field="email"/>}
                        {type === 'webhook' && <Input label="Webhook URL" field="webhookUrl"/>}
                        <Button type="submit">
                            <span>Add integration</span>
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
