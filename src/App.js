import React, {Component} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

import './Common/Styles/reset.css';

import {store} from './Core';

import {AppHeader, Navigation} from "./Components";
import {AppPages} from "./Pages";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <AppHeader/>
                        <Navigation/>
                        <AppPages/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
