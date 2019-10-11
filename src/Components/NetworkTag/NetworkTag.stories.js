import React from 'react';
import {storiesOf} from "@storybook/react";

import {NetworkTypes} from "../../Common/constants";

import NetworkTag from "./NetworkTag";

const stories = storiesOf('Components|NetworkTag', module);

stories.add('networks', () => {
    return (
        <div>
            <div className="MarginBottom2">
                <NetworkTag className="MarginRight1" network={NetworkTypes.MAIN}/>
                <NetworkTag className="MarginRight1" network={NetworkTypes.KOVAN}/>
                <NetworkTag className="MarginRight1" network={NetworkTypes.ROPSTEN}/>
                <NetworkTag className="MarginRight1" network={NetworkTypes.RINKEBY}/>
                <NetworkTag className="MarginRight1" network={NetworkTypes.GOERLI}/>
                <NetworkTag className="MarginRight1" network="testing_unknown"/>
            </div>
            <div className="MarginBottom2">
                <NetworkTag className="MarginRight1" useShorthand network={NetworkTypes.MAIN}/>
                <NetworkTag className="MarginRight1" useShorthand network={NetworkTypes.KOVAN}/>
                <NetworkTag className="MarginRight1" useShorthand network={NetworkTypes.ROPSTEN}/>
                <NetworkTag className="MarginRight1" useShorthand network={NetworkTypes.RINKEBY}/>
                <NetworkTag className="MarginRight1" useShorthand network={NetworkTypes.GOERLI}/>
                <NetworkTag className="MarginRight1" useShorthand network="testing_unknown"/>
            </div>
        </div>
    )
});
