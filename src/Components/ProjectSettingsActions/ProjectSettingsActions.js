import React, {Component, Fragment} from 'react';

import {Button, Panel, PanelHeader, PanelContent, Dialog, DialogHeader, DialogBody} from "../../Elements";

import './ProjectSettingsActions.scss';

class ProjectSettingsActions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
        };
    }

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false,
        });
    };

    openDialog = () => {
        this.setState({
            dialogOpen: true,
        });
    };

    handleProjectDelete = () => {
        const {onAction} = this.props;

        onAction({
            type: 'DELETE',
        });

        this.handleDialogClose();
    };

    render() {
        const {dialogOpen} = this.state;

        return (
            <Fragment>
                <Panel className="ProjectSettingsActions">
                    <PanelHeader>
                        <h3>Project Actions</h3>
                    </PanelHeader>
                    <PanelContent>
                        <Button onClick={this.openDialog} color="secondary" outline>
                            <span>Delete Project</span>
                        </Button>
                    </PanelContent>
                </Panel>
                <Dialog open={dialogOpen} onClose={this.handleDialogClose}>
                    <DialogHeader>
                        <h5>Are you sure you wish to delete this project?</h5>
                    </DialogHeader>
                    <DialogBody className="DeleteDialogBody">
                        <p>By doing this you will lose a complete history of events and will not be able to recover them after.</p>
                        <div className="DeleteDialogActions">
                            <Button color="secondary" onClick={this.handleDialogClose}>
                                <span>Cancel</span>
                            </Button>
                            <Button color="secondary" outline onClick={this.handleProjectDelete}>
                                <span>Delete</span>
                            </Button>
                        </div>
                    </DialogBody>
                </Dialog>
            </Fragment>
        );
    }
}

export default ProjectSettingsActions;
