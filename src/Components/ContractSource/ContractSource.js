import React from 'react';

import CodePreview from "../CodePreview/CodePreview";

/**
 * @param {Contract} contract
 * @param {number} [line]
 * @constructor
 */
const ContractSource = ({contract, line}) => {
    return (
        <div className="ContractSource">
            <CodePreview source={contract.getMainFileSource()} line={line}/>
        </div>
    );
};

export default ContractSource;
