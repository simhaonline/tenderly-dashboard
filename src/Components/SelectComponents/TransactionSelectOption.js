import React from 'react';
import Blockies from "react-blockies";
import {components} from 'react-select';

import {generateShortAddress} from "../../Utils/AddressFormatter";

import {Icon, Tag} from "../../Elements";
import {NetworkTag} from "..";

import './TransactionSelectOption.scss';

function TransactionSelectOption(props) {
    const data = props.data;

    return (
        <components.Option {...props} className="TransactionSelectOption">
            <Blockies size={8} scale={5} className="TransactionSelectOption__Blockie" seed={data.value}/>
            <div className="MarginLeft2">
                <div className="MarginBottom1 DisplayFlex AlignItemsCenter">
                    <span className="SemiBoldText MonospaceFont MarginRight1">{generateShortAddress(data.txHash, 24, 8)}</span>
                </div>
                <div>
                    <Tag color={data.status ? 'success' : 'danger'} size="small">
                        <Icon icon={data.status ? 'check-circle' : 'x-circle'}/>
                        <span> {data.status ? 'Successful' : 'Failed'}</span>
                    </Tag>
                    <NetworkTag size="small" network={data.network}/>
                </div>
            </div>
        </components.Option>
    );
}

export default TransactionSelectOption;
