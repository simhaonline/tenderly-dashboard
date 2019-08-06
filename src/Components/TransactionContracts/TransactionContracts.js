import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";

import {getContractCompany, isRecognizedCompanyContract} from "../../Utils/CompanyContracts";

import {PanelDivider} from "../../Elements";
import {CompanyLogo} from "..";

class TransactionContracts extends Component {
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
                console.log(contract.name, contract.getUniqueId());
                data.otherContracts.push(contract);
            }

            return data;
        }, {
            companyContracts: {},
            projectContracts: [],
            otherContracts: [],
        });

        return (
            <div>
                {Object.keys(computedData.companyContracts).map(company => <div key={company}>
                    <CompanyLogo company={company}/>
                    <PanelDivider/>
                    {computedData.companyContracts[company].map(contract => <div key={contract.address}>
                        {contract.name}
                    </div>)}
                </div>)}
                <h4>Other Contracts</h4>
                {computedData.otherContracts.map(contract => <div key={contract.address}>
                    {contract.name}
                </div>)}
            </div>
        );
    }
}

TransactionContracts.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)),
};

export default TransactionContracts;
