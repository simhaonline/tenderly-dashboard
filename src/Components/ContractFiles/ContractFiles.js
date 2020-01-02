import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Contract} from "../../Core/models";

import {FullWidthContainer, Icon} from "../../Elements";
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
        const {contract, line} = this.props;
        const {selectedFile} = this.state;

        return (
            <FullWidthContainer>
                <div className="ContractFiles">
                    <div className="ContractFiles__FilesList">
                        {contract.files.map(file => <div key={file.id}
                                                         onClick={() => this.setSelectedFile(file)}
                                                         className={classNames(
                                                             "ContractFiles__FilesList__Item",
                                                             {"ContractFiles__FilesList__Item--Active": selectedFile.id === file.id},
                                                         )}>
                            <Icon icon="file-text" className="FileIcon"/>
                            <span className="FileName">{file.getFileName()}</span>
                        </div>)}
                    </div>
                    {!!selectedFile && <div className="ContractFiles__CodeWrapper">
                        <CodePreview line={line} file={selectedFile}/>
                    </div>}
                </div>
            </FullWidthContainer>
        );
    }
}

ContractFiles.propTypes = {
    contract: PropTypes.instanceOf(Contract).isRequired,
};

export default ContractFiles;
