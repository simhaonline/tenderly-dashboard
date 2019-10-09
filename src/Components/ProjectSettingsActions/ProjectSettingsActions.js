import React, {Component, Fragment} from 'react';

import {Button, Panel, PanelHeader, PanelContent, Dialog, DialogHeader, DialogBody} from "../../Elements";

import './ProjectSettingsActions.scss';
import {ProjectTypes} from "../../Common/constants";

class ProjectSettingsActions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            dialogAction: '',
        };
    }

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false,
        });
    };

    /**
     * @param {string} action
     */
    openDialog = (action) => {
        this.setState({
            dialogOpen: true,
            dialogAction: action,
        });
    };

    handleProjectAction = () => {
        const {onAction} = this.props;
        const {dialogAction} = this.state;

        onAction({
            type: dialogAction,
        });

        this.handleDialogClose();
    };

    render() {
        const {project} = this.props;
        const {dialogOpen, dialogAction} = this.state;

        return (
            <Fragment>
                <Panel className="ProjectSettingsActions">
                    <PanelHeader>
                        <h3>Project Actions</h3>
                    </PanelHeader>
                    <PanelContent>
                        {project.type === ProjectTypes.SHARED && <Button onClick={() => this.openDialog('LEAVE')} color="danger" outline>
                            <span>Leave Project</span>
                        </Button>}
                        {project.type !== ProjectTypes.SHARED && <Button onClick={() => this.openDialog('DELETE')} color="danger" outline>
                            <span>Delete Project</span>
                        </Button>}
                    </PanelContent>
                </Panel>
                <Dialog open={dialogOpen} onClose={this.handleDialogClose}>
                    <DialogHeader>
                        <h5>Are you sure you wish to {dialogAction.toLowerCase()} this project?</h5>
                    </DialogHeader>
                    <DialogBody className="DeleteDialogBody">
                        {dialogAction === 'LEAVE' && <p>By doing this you will lose access to this projects and all contracts in it.</p>}
                        {dialogAction === 'DELETE' && <p>By doing this you will lose a complete history of events and will not be able to recover them after.</p>}
                        <div className="DeleteDialogActions">
                            <Button color="secondary" onClick={this.handleDialogClose}>
                                <span>Cancel</span>
                            </Button>
                            <Button color="secondary" outline onClick={this.handleProjectAction}>
                                {dialogAction === 'LEAVE' && <span>Leave</span>}
                                {dialogAction === 'DELETE' && <span>Delete</span>}
                            </Button>
                        </div>
                    </DialogBody>
                </Dialog>
            </Fragment>
        );
    }
}

export default ProjectSettingsActions;
