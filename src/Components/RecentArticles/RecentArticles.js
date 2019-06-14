import React from 'react';

import {Icon, Button, Card, CardHeading} from "../../Elements";

import './RecentArticles.scss';

const RecentArticles = () => {
    return (
        <Card className="RecentArticles">
            <CardHeading className="ArticlesHeading">
                <h3>Recent Articles</h3>
                <Button outline size="small" href="https://medium.com/tenderly" target="_blank">
                    <Icon icon="medium"/>
                    <span>Read more</span>
                </Button>
            </CardHeading>
            <div className="ArticlesList">
                <a href="https://medium.com/tenderly/improving-smart-costract-development-with-tenderly-and-human-readable-stack-traces-16abfad5dd15" rel="noopener noreferrer" target="_blank" className="ArticleItem">
                    <div className="ArticlePreviewWrapper">
                        <img src="https://cdn-images-1.medium.com/max/2000/1*KjlNJ_UvYf68bRjCijGMjw.jpeg" className="ArticleImage" alt="Blog"/>
                    </div>
                    <div className="ArticleInfo">
                        <h5 className="ArticleTitle">Improving Smart Contract development with Tenderly and human readable stack traces</h5>
                    </div>
                </a>
            </div>
        </Card>
    )
};

export default RecentArticles;
