import React, {Component} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import Cookies from 'js-cookie';
import ReactGA from 'react-ga';
import * as Sentry from "@sentry/browser";


import 'highlight.js/styles/dracula.css';
import './Common/Styles/reset.css';
import './Common/Styles/base.css';

import * as authActions from "./Core/Auth/Auth.actions";
import MixPanel from "./Utils/MixPanel";

import {store} from './Core';

import {AppHeader, FeatureFlagControls} from "./Components";
import {AppPages} from "./Pages";

if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        dsn: 'https://7a6943685b344dae8c67e98c4ad39b63@sentry.io/1332206',
    });
}


class App extends Component {
    state = {
        loaded: false,
    };

    async componentDidMount() {
        let tokenCookie = Cookies.get('token');

        MixPanel.initialize();
        ReactGA.initialize('UA-125013494-2');
        ReactGA.pageview(window.location.pathname + window.location.search);

        const searchParams = new URLSearchParams(window.location.search);

        const loginToken = searchParams.get('login_token');

        if (!tokenCookie && !!loginToken) {
            tokenCookie = loginToken;
        }

        await store.dispatch(authActions.retrieveToken(tokenCookie, true));

        this.setState({
            loaded: true,
        });
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
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
