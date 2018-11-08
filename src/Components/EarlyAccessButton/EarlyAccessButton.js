import React, {Component, Fragment} from 'react';

import EarlyAccessSignUp from "../EarlyAccessSignUp/EarlyAccessSignUp";

import {Button} from "../../Elements";

class EarlyAccessButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false
        }
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
        const {label, color, size, outline} = this.props;
        const {dialogOpen} = this.state;

        return (
            <Fragment>
                <Button color={color} size={size} outline={outline} onClick={this.openDialog}>
                    <span>{label}</span>
                </Button>
                <EarlyAccessSignUp open={dialogOpen} onClose={this.handleDialogClose}/>
            </Fragment>
        )
    }
}

EarlyAccessButton.defaultProps = {
    label: 'Request early access',
    color: 'primary',
    size: 'normal',
    outline: true,
};


export default EarlyAccessButton;
