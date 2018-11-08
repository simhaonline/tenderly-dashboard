import React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';

import './Dialog.css';

Modal.setAppElement('#root');

const Dialog = ({open = false, onClose, children, overlayClose = true, escapeClose = true, className}) => {
    return (
        <Modal isOpen={open}
               onRequestClose={onClose}
               closeTimeoutMS={200}
               overlayClassName="DialogOverlay"
               className={classNames(
                   "DialogContent",
                   className,
               )}
               bodyOpenClassName="DialogOpened"
               shouldCloseOnOverlayClick={overlayClose}
               shouldCloseOnEsc={escapeClose}>
            {children}
        </Modal>
    )
};

export default Dialog;
