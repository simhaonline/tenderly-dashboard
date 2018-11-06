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
                    test
                </Dialog>
            </Fragment>
        );
    }
}

export default ProjectSettingsActions;
