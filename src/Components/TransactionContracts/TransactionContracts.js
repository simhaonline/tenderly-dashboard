import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";

import {getContractCompany, isRecognizedCompanyContract} from "../../Utils/CompanyContracts";

import {PanelDivider, Icon, Card, Tag, LinkButton} from "../../Elements";
import {CompanyLogo} from "..";

import './TransactionContracts.scss';
import {generateShortAddress} from "../../Utils/AddressFormatter";

const TransactionContract = ({contract}) => {
    return (
        <Card color="light" className="TransactionContracts__Card" clickable>
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
        };
    }

    render() {
        const {contracts} = this.props;

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
                {Object.keys(computedData.companyContracts).map(company => <div key={company}>
                    <CompanyLogo company={company}/>
                    <PanelDivider/>
                    {computedData.companyContracts[company].map(contract => <TransactionContract contract={contract} key={contract.address}/>)}
                </div>)}
                <h4>Other Contracts</h4>
                {computedData.otherContracts.map(contract => <TransactionContract contract={contract} key={contract.address}/>)}
            </div>
        );
    }
}

TransactionContracts.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
};

export default TransactionContracts;
