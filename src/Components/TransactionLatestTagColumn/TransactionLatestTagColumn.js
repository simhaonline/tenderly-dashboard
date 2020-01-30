import React, {Fragment} from 'react';
import _ from "lodash";
import {Icon, Tag, Tooltip} from "../../Elements";
import Blockies from "react-blockies";
import {generateShortAddress} from "../../Utils/AddressFormatter";

const TransactionLatestTagColumn = ({transaction, revisions}) => {

    let txContracts = Array.from(new Set(transaction.contracts))
        .map(contractAddress => revisions.find(revision => revision.address === contractAddress && revision.network === transaction.network))
        .filter(contract => !!contract && contract.tags.length>0);

    const txTags = _.uniqBy(txContracts.map(revision=> revision.getLatestTag()), 'label');

    if (!txTags || txTags.length === 0) {
        return <div className="TransactionLatestTagColumn">
            <span className="MonospaceFont LinkText">-</span>
        </div>;
    }

    if(txTags.length===1){
        return <div className="TransactionLatestTagColumn">
            <Tag size="small" color="primary-outline">
                <Icon icon="tag"/>
                <span className="MonospaceFont">{txTags[0].label}</span>
            </Tag>
        </div>;
    }

    const id = `TxTagsTooltip__${transaction.txHash}`;

   return (
       <div className="TransactionLatestTagColumn">
           <div className="TransactionLatestTagColumn__Contract" id={id}>
               <span className="MonospaceFont LinkText">{txTags.length} Tags</span>
           </div>
           <Tooltip id={id} className="TransactionLatestTagColumn__Tooltip" placement="bottom">
               {txContracts.map(contract => <div key={contract.address} className="MarginBottom1 MarginTop1">
                   <Blockies
                       seed={contract.id}
                       size={8}
                       scale={2}
                       className="BorderRadius1 MarginRight1"
                   />
                   <span className="SemiBoldText MarginRight1">{generateShortAddress(contract.address)}:</span>
                   <Tag size="small" color="primary-outline">
                       <Icon icon="tag"/>
                       <span className="MonospaceFont">{contract.getLatestTag().label}</span>
                   </Tag>
               </div>)}
           </Tooltip>
       </div>
    );
};

export default TransactionLatestTagColumn;