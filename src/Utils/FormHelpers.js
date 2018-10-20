/**
 * @param component
 * @param {Object} formData
 */
export function initializeForm(component, formData) {
    component.state = {
        ...component.state,
        formData,
    };
}

/**
 * @param {string} field
 * @param {string} value
 */
export function updateFormField(field, value) {
    const {formData} = this.state;

    this.setState({
        formData: {
            ...formData,
            [field]: value,
        }
    });
}
