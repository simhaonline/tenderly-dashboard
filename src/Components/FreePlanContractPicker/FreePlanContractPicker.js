import React from 'react';
import {ContractSelect, PaidFeatureButton} from "../index";
import {Card} from "../../Elements";

const FreePlanContractPicker = ({project, contract, accountPlan, onChange}) => {
    return (
        <Card className='DisplayFlex AlignItemsCenter '>
            <div className='MaxWidth480 Flex1'>
                <ContractSelect project={project} value={contract}
                                onChange={onChange}/>
            </div>
            <div className='MarginLeftAuto'>
                <PaidFeatureButton includes="transaction_search.filtering" plan={accountPlan} outline>
                    <span>Upgrade</span>
                </PaidFeatureButton>
            </div>
        </Card>
    );
};

export default FreePlanContractPicker;