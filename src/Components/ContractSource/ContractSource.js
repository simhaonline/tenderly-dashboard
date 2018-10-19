import React from 'react';

import Code from "../Code/Code";

const ContractSource = ({contract}) => {
    return (
        <div className="ContractSource">
            <Code source={contract.source} line={19}/>
        </div>
    );
};

export default ContractSource;
