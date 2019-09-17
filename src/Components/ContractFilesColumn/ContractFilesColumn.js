import React from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";

import {Icon} from "../../Elements";

const ContractFilesColumn = ({contract}) => {
    return (
        <div className="ContractFilesColumn">
            <Icon className="MutedText" icon="file-text"/>
            <span> {contract.files.length} {contract.files.length > 1 ? "Files" : "File"}</span>
        </div>
    )
};

ContractFilesColumn.propTypes = {
    contract: PropTypes.instanceOf(Contract),
};

export default ContractFilesColumn;
