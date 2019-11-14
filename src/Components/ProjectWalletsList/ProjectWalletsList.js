import React, {Component} from 'react';

import {Card} from "../../Elements";
import {Link} from "react-router-dom";

class ProjectWalletsList extends Component {
    render() {
        const {projectWallets, wallets, project} = this.props;

        console.log(wallets, project);

        return (
            <div>
                {projectWallets.map(wallet => <Link to={}>

                </Link>)}
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
