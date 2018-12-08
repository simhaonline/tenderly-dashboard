import React, {Component} from 'react';

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {Input} from "../../Elements";
import {EventFilterTypes} from "../../Common/constants";

class ProjectEventFilters extends Component {
    constructor(props) {
        super(props);

        initializeForm(this, {
            searchQuery: '',
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

    render() {
        const {formData: {searchQuery}} = this.state;

        return (
            <div className="ProjectEventFilters">
                <div className="QueryColumn">
                    <Input icon="search"
                           label="Search events by txHash, contract address or string"
                           field="searchQuery"
                           value={searchQuery} onChange={this.handleSearchQueryChange}/>
                </div>
                <div className="DropdownColumn">Contract dropdown</div>
            </div>
        )
    }
}

ProjectEventFilters.defaultProps = {
    onFiltersChange: () => {},
};

export default ProjectEventFilters;
