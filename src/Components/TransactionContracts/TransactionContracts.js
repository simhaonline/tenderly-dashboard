import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {generateShortAddress} from "../../Utils/AddressFormatter";

import {Contract} from "../../Core/models";
import {Trace} from "../../Core/Trace/Trace.model";

import {getContractCompany, isRecognizedCompanyContract} from "../../Utils/CompanyContracts";

import {PanelDivider, Icon, Card, Tag, LinkButton} from "../../Elements";
import {CompanyLogo, CodePreview} from "..";

import './TransactionContracts.scss';

const TransactionContract = ({contract, onSelect}) => {
    return (
        <Card color="light" className="TransactionContracts__Card" clickable onClick={() => onSelect(contract)}>
            <div className="SemiBoldText">{contract.name}</div>
            <div className="MonospaceFont LinkText">{generateShortAddress(contract.address, 8)}</div>
            <div>
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
                {contract.isPublic && contract.isVerifiedPublic && <LinkButton>
                    <Icon icon='plus'/>
                    <span>Add to Project</span>
                </LinkButton>}
            </div>
        </Card>
    );
};

class TransactionContracts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedContract: null,
            selectedFile: null,
            highlightedLine: null,
        };
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
        console.log(file);
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

        const computedData = contracts.reduce((data, contract) => {
            if (isRecognizedCompanyContract(contract)) {
                const company = getContractCompany(contract);
                if (!data.companyContracts[company]) {
                    data.companyContracts[company] = [];
                }

                data.companyContracts[company].push(contract);
            } else {
                data.otherContracts.push(contract);
            }

            return data;
        }, {
            companyContracts: {},
            otherContracts: [],
        });

        return (
            <div className="TransactionContracts">
                {!selectedFile && <div>
                    {Object.keys(computedData.companyContracts).map(company => <div key={company}>
                        <CompanyLogo company={company}/>
                        <PanelDivider/>
                        {computedData.companyContracts[company].map(contract => <TransactionContract onSelect={this.handleContractSelect} contract={contract} key={contract.address}/>)}
                    </div>)}
                    <h4>Other Contracts</h4>
                    {computedData.otherContracts.map(contract => <TransactionContract onSelect={this.handleContractSelect} contract={contract} key={contract.address}/>)}
                </div>}
                {!!selectedFile && <div>
                    <div>
                        <LinkButton onClick={this.backToContracts}>Contracts</LinkButton>
                        <Icon icon="chevron-right"/>
                        <span>{selectedContract.name}</span>
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
