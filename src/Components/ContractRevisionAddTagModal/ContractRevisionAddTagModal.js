import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ProjectContractRevision} from "../../Core/models";
import {Button, Dialog, DialogBody, DialogHeader, DialogLoader, Form, Input} from "../../Elements";

class ContractRevisionAddTagModal extends Component {
    state = {
        label: '',
        adding: false,
    };

    handleModalClose = () => {
        const {onClose} = this.props;

        this.setState({
            label: '',
        }, onClose);
    };

    handleLabelChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    handleFormSubmit = () => {
        const {label} = this.state;

        console.log(label);

        // @TODO Perform action

        this.handleModalClose();
    };

    render() {
        const {open} = this.props;
        const {adding, label} = this.state;


        return (
            <Dialog open={open} onClose={this.handleModalClose}>
                <DialogHeader>
                    <h3>Add Tag to contract</h3>
                </DialogHeader>
                <DialogBody>
                    <Form>
                        <Input value={label} field="label" onChange={this.handleLabelChange}/>
                        <Button type="submit">
                            <span>Create Tag</span>
                        </Button>
                    </Form>
                    {adding && <DialogLoader/>}
                </DialogBody>
            </Dialog>
        );
    }
}

ContractRevisionAddTagModal.propTypes = {
    open: PropTypes.bool.isRequired,
    revision: PropTypes.instanceOf(ProjectContractRevision).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ContractRevisionAddTagModal;
