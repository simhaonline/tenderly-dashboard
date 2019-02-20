import React from 'react';

import {Button, Icon} from "../../Elements";

import './PaginationControls.css';

const PaginationControls = ({onPrevious, onNext, current, max, disabled}) => {
    return (
        <div className="PaginationControls">
            <Button outline size="small" className="PaginationPreviousControl" onClick={onPrevious} disabled={current <= 1 || disabled}>
                <Icon icon="chevron-left"/>
            </Button>
            <div className="CurrentPagination">
                <span>{current}</span>
            </div>
            <Button outline size="small" className="PaginationNextControl" onClick={onNext} disabled={current >= max || disabled}>
                <Icon icon="chevron-right"/>
            </Button>
        </div>
    )
};

PaginationControls.defaultProps = {
    onPrevious: () => {},
    onNext: () => {},
    max: 1000,
    disabled: false,
};

export default PaginationControls;
