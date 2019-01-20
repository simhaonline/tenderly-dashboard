import React from 'react';

import {CircularLoader} from "../Loaders/Loaders";

import {OAuthServiceTypeMap} from "../../Common/constants";

import './OAuthLaoder.css';

const ServiceToLabelMap = {
    [OAuthServiceTypeMap.GOOGLE]: 'Google',
    [OAuthServiceTypeMap.GITHUB]: 'GitHub',
};

const OAuthLoader = ({service}) => {
  return (
      <div className="OAuthLoader">
          <CircularLoader/>
          <div className="LoadingMessage">Authenticating via {ServiceToLabelMap[service]}</div>
      </div>
  )
};

export default OAuthLoader;
