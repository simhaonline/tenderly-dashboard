import React from 'react';
import {components} from "react-select";

import {Icon} from "../../Elements";
import Blockies from "react-blockies";
import {NetworkTag} from "../index";
import {generateShortAddress} from "../../Utils/AddressFormatter";

function ContractSelectValue(props) {
    /** @type {Contract} */
    const contract = props.data;

    return <components.SingleValue {...props} className="ContractSelectValue PaddingLeft1">
        <div className='DisplayFlex AlignItemsCenter'>
            <Blockies size={8} scale={5} className="BorderRadius2" seed={contract.getUniqueId()}/>
            <div className="MarginLeft2">
                <div className="SemiBoldText">{contract.name}</div>
                <div>
                    <NetworkTag size="small" network={contract.network}/>
                    <span className="MonospaceFont LinkText MarginLeft1">{generateShortAddress(contract.address, 12, 6)}</span>
                </div>
            </div>
        </div>
    </components.SingleValue>;
}

export default ContractSelectValue;