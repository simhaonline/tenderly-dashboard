import React from 'react';
import PropTypes from 'prop-types';
import {components} from 'react-select';

function ContractMethodOrLogSelectOption(props) {
    /** @type {(ContractMethod|ContractLog)} */
    const data = props.data;

    return (
        <components.Option {...props}>
            <div className="DisplayFlex AlignItemsCenter">
                <div className="Padding1">
                    {`{..}`}
                </div>
                <div className="MonospaceFont MarginLeft2">
                    <div className="SemiBoldText MarginBottom1">
                        {data.name}
                    </div>
                    <div>
                        {!!data.inputs && data.inputs.length > 0 && data.inputs.map(input => <span key={input.name}>
                            <span className="LinkText MarginRight1">{input.type}</span>
                            <span>{input.name}, </span>
                        </span>)}
                        {(!data.inputs || data.inputs.length === 0) && <span>No inputs</span>}
                    </div>
                </div>
            </div>
        </components.Option>
    );
}

ContractMethodOrLogSelectOption.propTypes = {
    unique: PropTypes.bool,
};

export default ContractMethodOrLogSelectOption;
