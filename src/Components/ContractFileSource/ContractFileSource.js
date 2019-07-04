import React from 'react';

import CodePreview from "../CodePreview/CodePreview";
import {Panel, PanelHeader, PanelContent} from "../../Elements";

/**
 * @param {ContractFile} file
 * @param {number} [line]
 * @constructor
 */
const ContractFileSource = ({file, line}) => {
    return (
        <Panel className="ContractFileSource">
            <PanelHeader>
                <h3>Source Code</h3>
            </PanelHeader>
            <PanelContent>
                <CodePreview file={file} line={line}/>
            </PanelContent>
        </Panel>
    );
};

export default ContractFileSource;
