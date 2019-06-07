import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Card, CardHeading} from "../../Elements";
import {ContractSource} from "../index";

class ContractFiles extends Component {
    render() {
        const {contract} = this.props;

        return (
            <Card>
                <CardHeading>
                    <h3>Source Code</h3>
                </CardHeading>
                <ContractSource contract={contract}/>
            </Card>
        );
    }
}

ContractFiles.propTypes = {
    contract: PropTypes.object.isRequired,
};

export default ContractFiles;
