import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as appActions from "../../Core/App/App.actions";

import {Form, Button, Dialog, DialogBody, DialogHeader, Icon, TextArea} from "../../Elements";
import {initializeForm, resetForm, updateFormField} from "../../Utils/FormHelpers";

import './SupportDialog.scss';

class SupportDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sending: false,
            ticketSent: false,
        };

        initializeForm(this, {
            message: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleSendFeedback = async () => {
        const {user, actions, onClose} = this.props;
        const {formData: {message}} = this.state;

        this.setState({
            sending: true,
        });

        await actions.sendSupportTicket(user, message);

        this.setState({
            ticketSent: true,
            sending: false,
        });

        setTimeout(() => {
            onClose();
            this.setState({
                sending: false,
                ticketSent: false,
            });

            resetForm(this, {
                message: '',
            });
        }, 2500);
    };

    render() {
        const {open, onClose} = this.props;
        const {formData: {message}, sending, ticketSent} = this.state;

        return (
            <Dialog open={open} onClose={onClose} className="SupportDialog">
                <DialogHeader>
                    <h3>Contact Support</h3>
                </DialogHeader>
                <DialogBody>
                    <Form onSubmit={this.handleSendFeedback}>
                        <TextArea value={message}
                                  field="message"
                                  placeholder="Please describe the issue you are experiencing."
                                  onChange={this.handleFormUpdate}
                                  autoFocus
                                  className="SupportTicketMessage"/>
                        {ticketSent && <p>Support ticket sent, we'll get back to you as soon as possible.</p>}
                        <Button type="submit" outline onClick={this.handleSendFeedback} disabled={ticketSent || sending}>
                            <Icon icon="send"/>
                            <span>Send</span>
                        </Button>
                    </Form>
                </DialogBody>
            </Dialog>
        );
    }
}

SupportDialog.defaultProps = {
    open: false,
    onClose: () => {},
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(appActions, dispatch),
    }
};

export default connect(
    null,
    mapDispatchToProps
)(SupportDialog);
