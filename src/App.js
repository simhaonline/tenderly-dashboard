import React, {Component} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import Cookies from 'js-cookie';
import ReactGA from 'react-ga';

import 'highlight.js/styles/dracula.css';
import './Common/Styles/reset.css';
import './Common/Styles/base.css';

import * as authActions from "./Core/Auth/Auth.actions";

import {store} from './Core';

import {AppHeader, FeatureFlagControls} from "./Components";
import {AppPages} from "./Pages";

class App extends Component {
    state = {
        loaded: false,
    };

    async componentDidMount() {
        const tokenCookie = Cookies.get('token');

        await store.dispatch(authActions.retrieveToken(tokenCookie));

        this.setState({
            loaded: true,
        });

        ReactGA.initialize('UA-125013494-2');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
    render() {
        const {loaded} = this.state;

        if (!loaded) return null;

        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <AppHeader/>
                        <AppPages/>
                        <FeatureFlagControls/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
