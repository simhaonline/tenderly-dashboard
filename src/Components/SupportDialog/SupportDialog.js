import React, {Component} from 'react';

import {Button, Dialog, DialogBody, DialogHeader, Icon, TextArea} from "../../Elements";

class SupportDialog extends Component {
    render() {
        const {open, onClose} = this.props;

        return (
            <Dialog open={open} onClose={onClose}>
                <DialogHeader>
                    <h3>Contact Support</h3>

                </DialogHeader>
                <DialogBody>
                    <TextArea/>
                    <div>
                        <Button outline>
                            <Icon icon="send"/>
                            <span>Send</span>
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        );
    }
}

SupportDialog.defaultProps = {
    open: false,
    onClose: () => {},
};

export default SupportDialog;
