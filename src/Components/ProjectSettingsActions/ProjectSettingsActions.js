import React, {Component, Fragment} from 'react';

import {Button, Card, Dialog} from "../../Elements";

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
                <Card className="ProjectSettingsActions">
                    <Button onClick={this.openDialog} color="danger" outline>
                        <span>Delete Project</span>
                    </Button>
                </Card>
                <Dialog open={dialogOpen} onClose={this.handleDialogClose}>
                    <h5>Are you sure you wish to delete this project?</h5>
                    <p>By doing this you will lose a complete history of events and will not be able to recover them after.</p>
                    <Button color="secondary" onClick={this.handleDialogClose}>
                        <span>Cancel</span>
                    </Button>
                    <Button color="secondary" outline onClick={this.handleProjectDelete}>
                        <span>Delete</span>
                    </Button>
                </Dialog>
            </Fragment>
        );
    }
}

export default ProjectSettingsActions;
