import React, {Component} from 'react';

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {Input} from "../../Elements";

class ProjectEventFilters extends Component {
    constructor(props) {
        super(props);

        initializeForm(this, {
            searchQuery: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    render() {
        const {formData: {searchQuery}} = this.state;

        return (
            <div className="ProjectEventFilters">
                <div>Contract dropdown</div>
                <Input icon="search"
                       label="Search events by txHash, contract address or string"
                       field="searchQuery"
                       value={searchQuery} onChange={this.handleFormUpdate}/>
            </div>
        )
    }
}

export default ProjectEventFilters;
