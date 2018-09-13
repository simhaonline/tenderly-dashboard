import React, {Component} from 'react';

import {AppHeader} from "./Components";
import {PublicContractsPage} from "./Pages";

class App extends Component {
    render() {
        return (
            <div className="App">
                <AppHeader/>
                <PublicContractsPage/>
            </div>
        );
    }
}

export default App;
