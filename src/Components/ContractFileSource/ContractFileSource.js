import React from 'react';

import CodePreview from "../CodePreview/CodePreview";
import {Panel, PanelContent} from "../../Elements";

/**
 * @param {ContractFile} file
 * @param {number} [line]
 * @constructor
 */
const ContractFileSource = ({file, line}) => {
    return (
        <Panel className="ContractFileSource">
            <PanelContent>
                <CodePreview file={file} line={line}/>
            </PanelContent>
        </Panel>
    );
};

export default ContractFileSource;
