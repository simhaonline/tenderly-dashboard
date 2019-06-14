import React from 'react';

import {CircularLoader} from "../Loaders/Loaders";

import {OAuthServiceLabelMap} from "../../Common/constants";

import './OAuthLaoder.scss';

const OAuthLoader = ({service}) => {
  return (
      <div className="OAuthLoader">
          <CircularLoader/>
          <div className="LoadingMessage">Authenticating via {OAuthServiceLabelMap[service]}</div>
      </div>
  )
};

export default OAuthLoader;
