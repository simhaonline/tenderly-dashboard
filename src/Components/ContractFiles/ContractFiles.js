import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Contract} from "../../Core/models";

import {Panel, PanelHeader, PanelContent, PanelDivider} from "../../Elements";
import {CodePreview} from "../index";

import './ContractFiles.scss';

class ContractFiles extends Component {
    constructor(props) {
        super(props);

        const {contract} = this.props;

        this.state = {
            selectedFile: contract.mainFile,
        };
    }

    setSelectedFile = (file) => {
        this.setState({
            selectedFile: file,
        });
    };

    render() {
        const {contract} = this.props;
        const {selectedFile} = this.state;

        return (
            <Panel>
                <PanelHeader>
                    <h3>Contract Files</h3>
                </PanelHeader>
                <PanelContent>
                    <div className="ContractFiles">
                        <div className="FilesList">
                            {contract.files.map(file => <div key={file.id}
                                                             onClick={() => this.setSelectedFile(file)}
                                                             className={classNames(
                                                                 "ContractFileWrapper",
                                                                 {"Active": selectedFile.id === file.id},
                                                             )}>
                                <div className="FileName">{file.getFileName()}</div>
                                <div className="FileVersion">Solidity Version: {file.solidityVersion}</div>
                            </div>)}
                        </div>
                        <PanelDivider/>
                        <CodePreview file={selectedFile}/>
                    </div>
                </PanelContent>
            </Panel>
        );
    }
}

ContractFiles.propTypes = {
    contract: PropTypes.instanceOf(Contract).isRequired,
};

export default ContractFiles;
