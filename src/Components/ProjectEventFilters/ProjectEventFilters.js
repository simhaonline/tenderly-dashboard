import React, {Component} from 'react';

import {EventFilterTypes} from "../../Common/constants";
import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {Input, Select} from "../../Elements";

import './ProjectEventFilters.css';

class ProjectEventFilters extends Component {
    constructor(props) {
        super(props);

        initializeForm(this, {
            searchQuery: '',
            contracts: [],
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    componentDidMount() {
        const {activeFilters} = this.props;

        activeFilters.forEach(filter => {
            if (filter.type === EventFilterTypes.QUERY) {
                this.handleFormUpdate('searchQuery', filter.value)
            } else if (filter.type === EventFilterTypes.CONTRACTS) {
                this.handleFormUpdate('contracts', filter.value)
            }
        });
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
     * @param {string} field
     * @param {(string[])} value
     */
    handleContractToggle = (field, value) => {
        const {onFiltersChange} = this.props;

        this.handleFormUpdate(field, value);

        onFiltersChange({
            type: EventFilterTypes.CONTRACTS,
            value,
        });
    };

    render() {
        const {contracts} = this.props;
        const {formData: {searchQuery, contracts: filterContracts}} = this.state;

        const contractSelectOptions = contracts.map(contract => ({
            value: contract.id,
            label: contract.name,
        }));

        return (
            <div className="ProjectEventFilters">
                <div className="QueryColumn">
                    <Input icon="search"
                           label="Search events by txHash, contract address or string"
                           field="searchQuery"
                           value={searchQuery} onChange={this.handleSearchQueryChange}/>
                </div>
                <div className="DropdownColumn">
                    <Select field="contracts" options={contractSelectOptions} multiple value={filterContracts} onChange={this.handleContractToggle}/>
                </div>
            </div>
        )
    }
}

ProjectEventFilters.defaultProps = {
    onFiltersChange: () => {},
};

export default ProjectEventFilters;
