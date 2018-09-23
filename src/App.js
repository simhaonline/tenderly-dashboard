import React, {Component} from 'react';

import './Common/Styles/reset.css';

import {AppHeader, Navigation} from "./Components";
import {PublicContractsPage} from "./Pages";

class App extends Component {
    render() {
        return (
            <div className="App">
                <AppHeader/>
                <Navigation/>
                <PublicContractsPage/>
            </div>
        );
    }
}

export default App;
