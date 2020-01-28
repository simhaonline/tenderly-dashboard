import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {Project, ProjectContractRevision} from "../../Core/models";
import {contractActions} from "../../Core/actions";

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

    handleFormSubmit = async () => {
        const {project, revision, contractActions} = this.props;
        const {label} = this.state;

        if (!revision || !label) {
            return;
        }

        this.setState({
            adding: true,
        });

        const response = await contractActions.addTagToProjectContractRevision(project, revision, label);

        this.setState({
            adding: false,
        });

        if (response.success) {
            this.handleModalClose();
        }
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
                    <Form onSubmit={this.handleFormSubmit}>
                        <p className="MarginBottom2">Add unique tags to your contracts to help you filter your transactions pinpoint key events that happened more easily.</p>
                        <Input value={label} field="label" onChange={this.handleLabelChange} icon="tag" autoFocus label="e.g. v1.3.37"/>
                        <div className="MarginTop4">
                            <Button type="submit" disabled={!label}>
                                <span>Add Tag</span>
                            </Button>
                            <Button onClick={this.handleModalClose} outline>
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </Form>
                    {adding && <DialogLoader/>}
                </DialogBody>
            </Dialog>
        );
    }
}

ContractRevisionAddTagModal.propTypes = {
    open: PropTypes.bool.isRequired,
    revision: PropTypes.instanceOf(ProjectContractRevision),
    project: PropTypes.instanceOf(Project).isRequired,
    onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        contractActions: bindActionCreators(contractActions, dispatch),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(ContractRevisionAddTagModal);
