import React from 'react';

import LogoHorizontal from './logo-horizontal.svg';
import LogoSymbol from './logo-symbol.svg';

const TenderlyLogo = ({symbol, className, width, height}) => {
    return (
        <img src={symbol ? LogoSymbol : LogoHorizontal} alt="Tenderly" height={height} width={width} className={className}/>
    );
};

TenderlyLogo.defaultProps = {
    symbol: false,
};

export default TenderlyLogo;
