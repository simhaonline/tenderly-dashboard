import React, {Component} from 'react';

import {Card} from "../../Elements";
import {Link} from "react-router-dom";

class ProjectWalletsList extends Component {
    render() {
        const {wallets, project} = this.props;

        console.log(wallets, project);

        return (
            <div>
                <Link to={`${project.getUrlBase()}/wallets/add`}>
                    <Card>
                        Add Wallet
                    </Card>
                </Link>
            </div>
        );
    }
}

export default ProjectWalletsList;
