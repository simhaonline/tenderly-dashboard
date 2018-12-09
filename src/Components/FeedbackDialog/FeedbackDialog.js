import React, {Component} from 'react';

import {Button, Dialog, DialogBody, DialogHeader, Icon, TextArea} from "../../Elements";

class FeedbackDialog extends Component {
    render() {
        const {open, onClose} = this.props;

        return (
            <Dialog open={open} onClose={onClose}>
                <DialogHeader>
                    <h3>Give Feedback</h3>
                </DialogHeader>
                <DialogBody>
                    <TextArea/>
                    <Button outline>
                        <Icon icon="send"/>
                        <span>Send</span>
                    </Button>
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
