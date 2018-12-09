import React, {Component} from 'react';

import {Form, Button, Dialog, DialogBody, DialogHeader, Icon, TextArea} from "../../Elements";

import './FeedbackDialog.css';
import {initializeForm, resetForm, updateFormField} from "../../Utils/FormHelpers";

class FeedbackDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sending: false,
            feedbackSent: false,
        };

        initializeForm(this, {
            message: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleSendFeedback = () => {
        const {onClose} = this.props;
        const {formData: {message}} = this.state;

        this.setState({
            sending: true,
        });

        console.log(message);

        this.setState({
            feedbackSent: true,
            sending: false,
        });

        setTimeout(() => {
            onClose();
            this.setState({
                sending: false,
                feedbackSent: false,
            });

            resetForm(this, {
                message: '',
            });
        }, 1500);
    };

    render() {
        const {open, onClose} = this.props;
        const {formData: {message}, sending, feedbackSent} = this.state;

        return (
            <Dialog open={open} onClose={onClose} className="FeedbackDialog">
                <DialogHeader>
                    <h3>Give Feedback</h3>
                </DialogHeader>
                <DialogBody>
                    <Form onSubmit={this.handleSendFeedback}>
                        <TextArea onChange={this.handleFormUpdate} field="message" value={message} autoFocus/>
                        {feedbackSent && <p>Feedback sent!</p>}
                        <Button type="submit" outline onClick={this.handleSendFeedback} disabled={feedbackSent || sending}>
                            <Icon icon="send"/>
                            <span>Send</span>
                        </Button>
                    </Form>
                </DialogBody>
            </Dialog>
        );
    }
}

FeedbackDialog.defaultProps = {
    open: false,
    onClose: () => {},
};

export default FeedbackDialog;
