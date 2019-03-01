import React from 'react';

import CodePreview from "../CodePreview/CodePreview";

const ContractSource = ({contract, line}) => {
    return (
        <div className="ContractSource">
            <CodePreview source={contract.source} line={line}/>
        </div>
    );
};

export default ContractSource;
