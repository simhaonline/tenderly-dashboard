import React from 'react';

import {Icon, Button} from "../../Elements";

import './RecentArticles.css';

const RecentArticles = () => {
    return (
        <div className="RecentArticles">
            <div className="ArticlesHeading">
                <h2>Recent Articles</h2>
                <Button outline size="small" href="https://medium.com/tenderly" target="_blank">
                    <Icon icon="medium"/>
                    <span>Read more</span>
                </Button>
            </div>
            <hr/>
            <div className="ArticlesList">
                <a href="https://medium.com/tenderly/improving-smart-contract-development-with-tenderly-and-human-readable-stack-traces-16abfad5dd15" target="_blank" className="ArticleItem">
                    <div className="ArticlePreviewWrapper">
                        <img src="https://cdn-images-1.medium.com/max/2000/1*KjlNJ_UvYf68bRjCijGMjw.jpeg" className="ArticleImage" alt="Blog Image"/>
                    </div>
                    <div className="ArticleInfo">
                        <h5 className="ArticleTitle">Improving Smart Contract development with Tenderly and human readable stack traces</h5>
                    </div>
                </a>
            </div>
        </div>
    )
};

export default RecentArticles;
