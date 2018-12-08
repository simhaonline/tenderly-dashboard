import React, {Component} from 'react';

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {Input, Toggle} from "../../Elements";
import {EventFilterTypes} from "../../Common/constants";

class ProjectEventFilters extends Component {
    constructor(props) {
        super(props);

        initializeForm(this, {
            searchQuery: '',
            contracts: [],
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    /**
     * @param {string} field
     * @param {string} value
     */
    handleSearchQueryChange = (field, value) => {
        const {onFiltersChange} = this.props;

        this.handleFormUpdate(field, value);

        onFiltersChange({
            type: EventFilterTypes.QUERY,
            value,
        });
    };

    /**
     * @param {Contract} contract
     */
    handleContractToggle = (contract) => {
        const {onFiltersChange} = this.props;
        const {formData: {contracts: filterContracts}} = this.state;

        let contracts = [];

        if (filterContracts.includes(contract.id)) {
            contracts = filterContracts.filter(filter => filter !== contract.id);
        } else {
            contracts = [
                ...filterContracts,
                contract.id,
            ];
        }

        this.handleFormUpdate('contracts', contracts);

        onFiltersChange({
            type: EventFilterTypes.CONTRACTS,
            value: contracts,
        });
    };

    render() {
        const {contracts} = this.props;
        const {formData: {searchQuery, contracts: filterContracts}} = this.state;

        return (
            <div className="ProjectEventFilters">
                <div className="QueryColumn">
                    <Input icon="search"
                           label="Search events by txHash, contract address or string"
                           field="searchQuery"
                           value={searchQuery} onChange={this.handleSearchQueryChange}/>
                </div>
                <div className="DropdownColumn">
                    <span>Contract dropdown</span>
                    <div>
                        {contracts.map(contract => <div key={contract.id} onClick={() => {this.handleContractToggle(contract)}}>
                            {contract.name}
                            <Toggle value={filterContracts.includes(contract.id)}/>
                        </div>)}
                    </div>
                </div>
            </div>
        )
    }
}

ProjectEventFilters.defaultProps = {
    onFiltersChange: () => {},
};

export default ProjectEventFilters;
