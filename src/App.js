import React, {Component} from 'react';
import {Provider} from "react-redux";

import './Common/Styles/reset.css';

import {store} from './Core';

import {AppHeader, Navigation} from "./Components";
import {PublicContractsPage} from "./Pages";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <AppHeader/>
                    <Navigation/>
                    <PublicContractsPage/>
                </div>
            </Provider>
        );
    }
}

export default App;
