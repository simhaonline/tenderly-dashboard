import React from 'react';
import Blockies from "react-blockies";
import _ from 'lodash';
import {Link} from "react-router-dom";

import {generateShortAddress} from "../../Utils/AddressFormatter";

import './ExplorerRecentSearches.scss';
import {LinkButton} from "../../Elements";

/**
 * @param {SearchResult[]} searches
 * @param {Function} onClear
 */
const ExplorerRecentSearches = ({searches, onClear}) => {
    const uniqueSearches = _.uniqBy(searches, 'value');

    return (
        <div className="ExplorerRecentSearches">
            <h3 className="ExplorerRecentSearches__Heading">Recently Searched <LinkButton className="ExplorerRecentSearches__ClearButton" onClick={onClear}>Clear history</LinkButton></h3>
            <div className="ExplorerRecentSearches__SearchWrapper">
                {uniqueSearches.map(searchResult => <Link to={searchResult.getUrl()} key={searchResult.value} className="ExplorerRecentSearches__Search">
                    <Blockies size={8} scale={8} className="BorderRadius3" seed={searchResult.value}/>
                    <div className="ExplorerRecentSearches__Search__Label">{searchResult.label}</div>
                    <div className="LinkText MonospaceFont ExplorerRecentSearches__Search__Hex">{generateShortAddress(searchResult.hex, 8, 4)}</div>
                </Link>)}
            </div>
        </div>
    );
};

export default ExplorerRecentSearches;
