import React from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";

import {Icon} from "../../Elements";

/**
 * @param {Contract} contract
 * @param {Object[]} tags
 */
const ContractFilesColumn = ({contract, tags}) => {
    return (
        <div className="ContractFilesColumn DisplayFlex AlignItemsCenter">
            <div>
                <Icon className="MutedText" icon="file-text"/>
                <span> {contract.filesCount} {contract.filesCount > 1 ? "Files" : "File"}</span>
            </div>
            {tags && tags.length > 0 && <div className="MarginLeft2">
                <Icon className="MutedText" icon="tag"/>
                {tags.length === 1 && <span> {tags[0].tag}</span>}
                {tags.length > 1 && <span> {tags.length} Tags</span>}
            </div>}
        </div>
    )
};

ContractFilesColumn.propTypes = {
    contract: PropTypes.instanceOf(Contract),
    tags: PropTypes.array,
};

export default ContractFilesColumn;
