import React, {Component, Fragment} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import Cookies from 'js-cookie';
import ReactGA from 'react-ga';
import * as Sentry from "@sentry/browser";
import {ToastContainer, cssTransition} from "react-toastify";

import 'highlight.js/styles/dracula.css';
import 'react-toastify/dist/ReactToastify.css';
import './Common/Styles/reset.scss';
import './Common/Styles/base.scss';

import Intercom from "./Utils/Intercom";
import LocalStorage from "./Utils/LocalStorage";

import {LocalStorageKeys} from "./Common/constants";

import {searchActions, authActions} from "./Core/actions";
import {store} from './Core';

import {AppHeader, FeatureFlagControls} from "./Components";

import {AppPages} from "./Pages";
import GeneralErrorPage from "./Pages/General/GeneralErrorPage";
import SessionResolutionPage from "./Pages/General/SessionResolutionPage";

if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        dsn: 'https://7a6943685b344dae8c67e98c4ad39b63@sentry.io/1332206',
    });
}

const ToastAnimation = cssTransition({
    enter: 'zoomIn',
    exit: 'zoomOut',
    duration: 300,
});

class App extends Component {
    state = {
        loaded: false,
    };

    /**
     * @param {User|null} user
     * @param {Plan|null} plan
     */
    isSessionResolutionRequired = (user, plan) => {
        if (!plan) return false;

        return plan.slug === 'grandfather' && !plan.isPlanActive;
    };

    async componentDidMount() {
        let tokenCookie = Cookies.get('token');

        Intercom.boot();
        ReactGA.initialize('UA-125013494-1', {
            gaOptions: {
                name: 'dashboard',
            },
        });
        ReactGA.pageview(window.location.pathname + window.location.search);

        const searchParams = new URLSearchParams(window.location.search);

        const loginToken = searchParams.get('login_token');

        if (!tokenCookie && !!loginToken) {
            tokenCookie = loginToken;
        }

        const sessionResponse = await store.dispatch(authActions.retrieveToken(tokenCookie));

        const recentSearchesCache = LocalStorage.getItem(LocalStorageKeys.RECENT_SEARCHES);

        if (recentSearchesCache) {
            await store.dispatch(searchActions.setRecentSearchesFromCache(recentSearchesCache));
        }

        const user = sessionResponse.success ? sessionResponse.data.user : null;
        const plan = sessionResponse.success ? sessionResponse.data.plan : null;

        this.setState({
            loaded: true,
            user,
            plan,
            resolutionRequired: this.isSessionResolutionRequired(user, plan),
        });
    }

    componentDidCatch(error, errorInfo) {
        Sentry.captureException(error);

        return this.setState({
            error: error,
        });
    }

    handleSessionResolution = () => {
        this.setState({
            resolutionRequired: false,
        });
    };

    render() {
        const {loaded, error, user, plan, resolutionRequired} = this.state;

        // @TODO Create loader here
        if (!loaded) return null;

        if (error) {
            return <GeneralErrorPage/>;
        }

        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        {resolutionRequired && <SessionResolutionPage user={user} plan={plan} onResolution={this.handleSessionResolution}/>}
                        {!resolutionRequired && <Fragment>
                            <AppHeader/>
                            <div id="AppContent">
                                <AppPages/>
                            </div>
                        </Fragment>}
                        {process.env.NODE_ENV === 'development' && <FeatureFlagControls/>}
                        <ToastContainer toastClassName="ToastMessage" transition={ToastAnimation} pauseOnFocusLoss={false} draggable={false}
                                        bodyClassName="ToastBody" closeButton={false} position="bottom-right" hideProgressBar/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
