import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Blockies from "react-blockies";

import {Card, Tag} from "../../Elements";

import './ProjectWalletsList.scss';

class ProjectWalletsList extends Component {
    render() {
        const {projectWallets, wallets, project} = this.props;

        return (
            <div className="ProjectWalletsList">
                {projectWallets.map(projectWallet => {
                    const wallet = wallets.find(w => w.id === projectWallet.walletId);

                    const tokenBalance = wallet.getWalletToken(projectWallet.defaultToken);

                    return <Link key={projectWallet.id} to={`${project.getUrlBase()}/wallet/${wallet.getRouteSlug()}/${wallet.address}`} className="ProjectWalletsList__Item">
                        <Card className="ProjectWalletsList__Item__Card">
                            <div className="DisplayFlex AlignItemsCenter">
                                <Blockies size={8} scale={5} className="BorderRadius1 MarginRight2" seed={wallet.id}/>
                                <div>
                                    <div className="SemiBoldText FontSize4 MarginBottom1">{projectWallet.name}</div>
                                    <div className="LinkText MonospaceFont">{wallet.address}</div>
                                </div>
                            </div>
                            <div>
                                {wallet.walletTokens.map(wt => <Tag key={wt.token} color="primary-outline" size="small">{wt.shorthand}</Tag>)}
                            </div>
                            <div className="DisplayFlex AlignItemsCenter">
                                <div>
                                    <div>{tokenBalance.name}</div>
                                    <div>{tokenBalance.shorthand}</div>
                                </div>
                                <div className="MarginLeftAuto">
                                    <span className="FontSize4">{tokenBalance.balance}</span>
                                </div>
                            </div>
                        </Card>
                    </Link>;
                })}
                <Link to={`${project.getUrlBase()}/wallets/add`} className="ProjectWalletsList__Item">
                    <Card className="ProjectWalletsList__Item__Card ProjectWalletsList__Item__Card--Active">
                        Add Wallet
                    </Card>
                </Link>
            </div>
        );
    }
}

export default ProjectWalletsList;
