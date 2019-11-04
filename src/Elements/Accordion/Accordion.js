import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './Accordion.scss';

const Accordion = ({open, initiallyOpened = false, onToggle, label, description, children}) => {
    const [localOpen, setLocalOpen] = useState(initiallyOpened);

    const isOpenDefined = open !== null && open !== undefined;
    let isOpen = localOpen;

    if (isOpenDefined) {
        isOpen = open;
    }

    return (
        <div className="Accordion">
            <div className="Accordion__Header" onClick={() => {
                if (isOpenDefined && onToggle) {
                    onToggle();
                } else {
                    setLocalOpen(!localOpen);
                }
            }}>
                <div className="Accordion__Header__Label">{label}</div>
                {!!description && <div className="Accordion__Header__Description">{description}</div>}
            </div>
            {isOpen && <div className="Accordion__Content">{children}</div>}
        </div>
    );
};

Accordion.propTypes = {
    open: PropTypes.bool,
    initiallyLoaded: PropTypes.bool,
    onToggle: PropTypes.func,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
};

export default Accordion;
