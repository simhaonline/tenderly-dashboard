import React from 'react';

import CodePreview from "../CodePreview/CodePreview";

/**
 * @param {ContractFile} file
 * @param {number} [line]
 * @constructor
 */
const ContractFileSource = ({file, line}) => {
    return (
        <div className="ContractFileSource">
            <CodePreview file={file} line={line}/>
        </div>
    );
};

export default ContractFileSource;
