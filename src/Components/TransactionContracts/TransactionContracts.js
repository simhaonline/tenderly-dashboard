import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {generateShortAddress} from "../../Utils/AddressFormatter";

import {Contract} from "../../Core/models";
import {Trace} from "../../Core/Trace/Trace.model";

import {Icon, Card, Tag, LinkButton} from "../../Elements";
import {CodePreview, CopyableText} from "..";

import './TransactionContracts.scss';

const TransactionContract = ({contract, onSelect}) => {
    return (
        <Card color="light" className="TransactionContracts__Card" clickable onClick={() => onSelect(contract)}>
            <div className="SemiBoldText">{contract.name}</div>
            <div className="MonospaceFont LinkText">{generateShortAddress(contract.address, 10)}</div>
            <div className="MarginTop2">
                {!contract.isPublic && <Tag size="small">
                    <Icon icon="project" className="TransactionContracts__Card__TagIcon"/>
                    <span>Project Contract</span>
                </Tag>}
                {contract.isPublic && contract.isVerifiedPublic && <Tag size="small" color="success">
                    <Icon icon='check-circle'/>
                    <span>Verified Contract</span>
                </Tag>}
                {contract.isPublic && !contract.isVerifiedPublic && <Tag size="small" color="warning">
                    <Icon icon='x-circle'/>
                    <span>Unverified Contract</span>
                </Tag>}
            </div>
        </Card>
    );
};

class TransactionContracts extends Component {
    constructor(props) {
        super(props);

        const {initialTrace, contracts} = this.props;

        let selectedContract;
        let selectedFile;
        let highlightedLine;

        if (initialTrace) {
            selectedContract = contracts.find(contract => contract.address === initialTrace.contract);

            if (selectedContract && initialTrace.fileId !== null) {
                selectedFile = selectedContract.getFileById(initialTrace.fileId);
            }

            if (selectedFile && initialTrace.lineNumber !== null) {
                highlightedLine = initialTrace.lineNumber;
            }
        }

        this.state = {
            selectedContract,
            selectedFile,
            highlightedLine,
        };
    }

    componentDidMount() {
        const {highlightedLine} = this.state;

        if (highlightedLine) {
            const scrollToLine = Math.max(1, highlightedLine - 10);

            setTimeout(() => {
                document.getElementById(`line-${scrollToLine}`).scrollIntoView();
            }, 0);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {initialTrace, contracts} = this.props;

        if (!!initialTrace && prevProps.initialTrace !== initialTrace) {
            let selectedContract;
            let selectedFile;
            let highlightedLine;

            selectedContract = contracts.find(contract => contract.address === initialTrace.contract);

            if (selectedContract && initialTrace.fileId !== null) {
                selectedFile = selectedContract.getFileById(initialTrace.fileId);
            }

            if (selectedFile && initialTrace.lineNumber !== null) {
                highlightedLine = initialTrace.lineNumber;
            }

            this.setState({
                selectedContract,
                selectedFile,
                highlightedLine,
            });

            const scrollToLine = Math.max(1, highlightedLine - 10);

            setTimeout(() => {
                document.getElementById(`line-${scrollToLine}`).scrollIntoView();
            }, 0);
        }
    }

    /**
     * @param {Contract} contract
     */
    handleContractSelect = (contract) => {
        this.setState({
            selectedContract: contract,
            selectedFile: contract.getMainFile(),
        });
    };

    /**
     * @param {ContractFile} file
     */
    handleContractFileSelect = (file) => {
        // @TODO handle selecting contract files
    };

    backToContracts = () => {
        this.setState({
            selectedContract: null,
            selectedFile: null,
            highlightedLine: null,
        });
    };

    render() {
        const {contracts} = this.props;
        const {selectedContract, selectedFile, highlightedLine} = this.state;

        // const computedData = contracts.reduce((data, contract) => {
        //     if (isRecognizedCompanyContract(contract)) {
        //         const company = getContractCompany(contract);
        //         if (!data.companyContracts[company]) {
        //             data.companyContracts[company] = [];
        //         }
        //
        //         data.companyContracts[company].push(contract);
        //     } else {
        //         data.otherContracts.push(contract);
        //     }
        //
        //     return data;
        // }, {
        //     companyContracts: {},
        //     otherContracts: [],
        // });

        return (
            <div className="TransactionContracts">
                {!selectedFile && <div>
                    <p>This is the list of all project and publicly verified contracts that have been involved in this transaction. Select a contract below to view its source.</p>
                    <div className="TransactionContracts__ContractsWrapper">
                        {contracts.map(contract => <TransactionContract onSelect={this.handleContractSelect} contract={contract} key={contract.address}/>)}
                    </div>
                </div>}
                {!!selectedFile && <div>
                    <h3 className="MarginBottom3">
                        <LinkButton onClick={this.backToContracts}>Contracts</LinkButton>
                        <Icon icon="chevron-right" className="MarginLeft1 MarginRight1"/>
                        <span>{selectedContract.name}</span>
                    </h3>
                    <div className="DisplayFlex AlignItemsCenter MarginBottom2">
                        <span className="MarginRight1">Address:</span>
                        <CopyableText text={selectedContract.address} position="right" onSuccessMessage="Copied contract address to clipboard"/>
                    </div>
                    <div className="MarginBottom4">
                        {!selectedContract.isPublic && <Tag>
                            <Icon icon="project" className="TransactionContracts__Card__TagIcon"/>
                            <span>Project Contract</span>
                        </Tag>}
                        {selectedContract.isPublic && selectedContract.isVerifiedPublic && <Tag color="success">
                            <Icon icon='check-circle'/>
                            <span>Verified Contract</span>
                        </Tag>}
                        {selectedContract.isPublic && !selectedContract.isVerifiedPublic && <Tag color="warning">
                            <Icon icon='x-circle'/>
                            <span>Unverified Contract</span>
                        </Tag>}
                    </div>
                    <CodePreview file={selectedFile} line={highlightedLine}/>
                </div>}
            </div>
        );
    }
}

TransactionContracts.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
    initialTrace: PropTypes.instanceOf(Trace),
};

export default TransactionContracts;
