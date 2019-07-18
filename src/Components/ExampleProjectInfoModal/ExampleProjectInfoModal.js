import React from 'react';
import PropTypes from 'prop-types';

import {Dialog, DialogHeader, DialogBody, Button} from "../../Elements";

const ExampleProjectInfoModal = ({open, onClose, header, description}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogHeader>
                <h3>{header}</h3>
            </DialogHeader>
            <DialogBody>
                <p className="TextAlignCenter MarginBottom4">{description}</p>
                <div className="DisplayFlex JustifyContentCenter">
                    <Button to="/project/create">
                        <span>Create Project</span>
                    </Button>
                    <Button outline onClick={onClose}>
                        <span>Close</span>
                    </Button>
                </div>
            </DialogBody>
        </Dialog>
    )
};

ExampleProjectInfoModal.propTypes = {
    header: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ExampleProjectInfoModal;
