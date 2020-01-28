import React from 'react';
import {Icon, Panel, PanelContent} from "../../Elements";
import Card from "../../Elements/Card/Card";
import Blockies from "react-blockies";

const TransactionConsoleLogs = ({consoleLogs, contracts}) => {
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
                               <div className="MarginLeft2">
                                   {consoleLog.output.map((value,index)=> <span className="MutedText MarginRight1" key={index}>{value}</span>)}
                               </div>
                       </div>
                   })}
               </Card>
           </PanelContent>
        </Panel>
    );
};

export default TransactionConsoleLogs;