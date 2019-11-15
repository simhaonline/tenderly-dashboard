import React, {Component} from 'react';

import {Card} from "../../Elements";
import {Link} from "react-router-dom";

class ProjectWalletsList extends Component {
    render() {
        const {projectWallets, wallets, project} = this.props;

        return (
            <div className="ProjectWalletsList">
                {projectWallets.map(projectWallet => {
                    const wallet = wallets.find(w => w.id === projectWallet.walletId);

                    const tokenBalance = wallet.getWalletToken(projectWallet.defaultToken);

                    return <Link key={projectWallet.id} to={`${project.getUrlBase()}/wallet/${wallet.getRouteSlug()}/${wallet.address}`} className="ProjectWalletsList__Item">
                        <Card className="DisplayFlex AlignItemsCenter ProjectWalletsList__Item__Card">
                            <div>
                                <div className="SemiBoldText MarginBottom1">{projectWallet.name}</div>
                                <div className="LinkText MonospaceFont">
                                    {wallet.walletTokens.map(wt => <span key={wt.token}>asd</span>)}
                                </div>
                            </div>
                            <div className="MarginLeftAuto">
                                <h2>{tokenBalance.balance} {tokenBalance.shorthand}</h2>
                            </div>
                        </Card>
                    </Link>;
                })}
                <Link to={`${project.getUrlBase()}/wallets/add`} className="ProjectWalletsList__Item">
                    <Card className="ProjectWalletsList__Item__Card">
                        Add Wallet
                    </Card>
                </Link>
            </div>
        );
    }
}

export default ProjectWalletsList;
