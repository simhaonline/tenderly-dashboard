import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Card, CardHeading} from "../../Elements";
import {ContractFileSource} from "../index";

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
                    <h3>Source Code</h3>
                </CardHeading>
                <div>
                    <div>
                        {contract.files.map(file => <div key={file.id} onClick={() => this.setSelectedFile(file)}>
                            <div>{file.getFileName()}</div>
                            <div>Solidity Version: {file.solidityVersion}</div>
                        </div>)}
                    </div>
                </div>
                <ContractFileSource file={selectedFile}/>
            </Card>
        );
    }
}

ContractFiles.propTypes = {
    contract: PropTypes.object.isRequired,
};

export default ContractFiles;
