import React from 'react';

import Code from "../Code/Code";

const ContractSource = ({contract, line}) => {
    return (
        <div className="ContractSource">
            <Code source={contract.source} line={line}/>
        </div>
    );
};

export default ContractSource;
