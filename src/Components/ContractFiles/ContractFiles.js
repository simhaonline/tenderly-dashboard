import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Card, CardHeading} from "../../Elements";
import {ContractFileSource} from "../index";

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
            <Card>
                <CardHeading>
                    <h3>Contract Files</h3>
                </CardHeading>
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
                    <ContractFileSource file={selectedFile}/>
                </div>
            </Card>
        );
    }
}

ContractFiles.propTypes = {
    contract: PropTypes.object.isRequired,
};

export default ContractFiles;
