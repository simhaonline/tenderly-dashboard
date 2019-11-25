import React, {Component} from 'react';

class DebuggingFeatureDemo extends Component {
    render() {
        return (
            <div>
                <h1>Debug any transaction</h1>
                <p>Just paste in the transaction hash and instantly see the whole execution path</p>
                <div className="DebuggingFeatureDemo__DemoWrapper">
                    <div className="DebuggingFeatureDemo__DemoWrapper__TransactionInput">
                        <div className="DebuggingFeatureDemo__DemoWrapper__Transaction">0x843aed7aa2...8412</div>
                    </div>
                    <div className="DebuggingFeatureDemo__DemoWrapper__Trace">
                        <div className="DebuggingFeatureDemo__DemoWrapper__TraceLine">transferFunds</div>
                        <div className="DebuggingFeatureDemo__DemoWrapper__TraceLine">prepareTransfer</div>
                        <div className="DebuggingFeatureDemo__DemoWrapper__TraceLine">alertProxyContract</div>
                        <div className="DebuggingFeatureDemo__DemoWrapper__TraceLine">prepareTransaction</div>
                        <div className="DebuggingFeatureDemo__DemoWrapper__TraceLine">sendFunds</div>
                        <div className="DebuggingFeatureDemo__DemoWrapper__TraceLine">checkIfFundsAvailable</div>
                        <code className="DebuggingFeatureDemo__DemoWrapper__TraceCode">
<pre>
{`function checkIfFundsAvailable(uint address, uint amount) {\n`}
{`    const userFunds = this.allAvailable[address];\n`}
{`\n`}
{`    require(`}<span className="DebuggingFeatureDemo__DemoWrapper__TraceVariable">userFunds</span> >= <span className="DebuggingFeatureDemo__DemoWrapper__TraceVariable">amount</span>{`);\n`}
{`}\n`}
{`\n`}
{`function sendFunds(unit amount) {`}
</pre>
                        </code>
                    </div>
                </div>
            </div>
        );
    }
}

export default DebuggingFeatureDemo;
