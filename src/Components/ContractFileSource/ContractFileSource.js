import React from 'react';

import CodePreview from "../CodePreview/CodePreview";

/**
 * @param {ContractFile} file
 * @param {number} [line]
 * @constructor
 */
const ContractFileSource = ({file, line}) => {
    return (
        <div className="ContractSource">
            <CodePreview source={file.source} line={line}/>
        </div>
    );
};

export default ContractFileSource;
