import React from 'react';
import {Icon, Panel, PanelContent} from "../../Elements";
import Card from "../../Elements/Card/Card";
import Blockies from "react-blockies";
import {CopyableText} from "../index";
import {generateShortAddress} from "../../Utils/AddressFormatter";
import LinkButton from "../../Elements/LinkButton/LinkButton";

const TransactionConsoleLogs = ({consoleLogs, contracts, onViewSource}) => {
    return (
        <Panel>
           <PanelContent>
                <p><Icon icon='terminal'/> <span className="SemiBoldText">{consoleLogs.length} console logs</span> were emitted in this transaction.</p>
               <Card color="dark">
                   {consoleLogs.map((consoleLog, index)=> {
                       const contract = contracts.find(c=> c.address===consoleLog.contract);
                       return <div key={index} className="DisplayFlex AlignItemsCenter">
                               {!!contract && <div className="DisplayFlex AlignItemsCenter">
                                   <Blockies size={8} scale={2} className="BorderRadius1 MarginRight1" seed={contract.id}/>
                               <span className="SemiBoldText">{contract.name}:</span>
                               </div>}
                               {!contract && <div>
                                   <CopyableText text={consoleLog.contract} render={(props)=> <span className={`MonospaceFont LinkText ${props.className}`}>{generateShortAddress(consoleLog.contract, 10, 6)}</span>} position="right" onSuccessMessage="Copied contract address to clipboard"/>
                               </div>}
                               <div className="MarginLeft2">
                                   {consoleLog.outputs.map((output,index)=> <span className="MutedText MarginRight1" key={index}>{output.value.toString()}</span>)}
                               </div>
                           {!!contract && !!consoleLog.line && !!consoleLog.fileId && <div className="MarginLeftAuto">
                              <LinkButton onClick={()=> onViewSource(consoleLog)}>
                                  {contract.name}:{consoleLog.line}
                              </LinkButton>
                           </div>}
                       </div>
                   })}
               </Card>
           </PanelContent>
        </Panel>
    );
};

export default TransactionConsoleLogs;