import React from 'react';
import Modal from 'react-modal';

import './Dialog.css';

Modal.setAppElement('#root');

const Dialog = ({open = false, onClose, children, overlayClose = true, escapeClose = true}) => {
    return (
        <Modal isOpen={open}
               onRequestClose={onClose}
               closeTimeoutMS={200}
               overlayClassName="DialogOverlay"
               className="DialogContent"
               bodyOpenClassName="DialogOpened"
               shouldCloseOnOverlayClick={overlayClose}
               shouldCloseOnEsc={escapeClose}>
            {children}
        </Modal>
    )
};

export default Dialog;
