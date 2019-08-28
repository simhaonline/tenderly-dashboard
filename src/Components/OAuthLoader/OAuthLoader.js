import React from 'react';

import {CircularLoader} from "../Loaders/Loaders";

import {OAuthServiceLabelMap, OAuthServiceTypeMap} from "../../Common/constants";

import './OAuthLaoder.scss';

const OAuthLoader = ({service}) => {
  return (
      <div className="OAuthLoader">
          <CircularLoader/>
          {service === OAuthServiceTypeMap.GITHUB && <div className="LoadingMessage">Authenticating via {OAuthServiceLabelMap[service]}</div>}
          {service === OAuthServiceTypeMap.SLACK && <div className="LoadingMessage">Connecting with {OAuthServiceLabelMap[service]}</div>}
      </div>
  )
};

export default OAuthLoader;
