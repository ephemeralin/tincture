import React, {Component} from 'react';
import './App.css';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {RssCard} from "./cards/RssCard";

class App extends Component {

    constructor(props) {
        super(props);
        document.body.className = (function () {
            return "bp3-dark";
        })();
    }

    render() {
        return (
            <div className="app">
                <div style={{margin: "0 0 10px 0"}}>
                    <RssCard
                        rssParams = {
                            {
                                rssUrl: "https://habr.com/ru/rss/best/daily/",
                                corsProxyUrl:  "https://cors-anywhere.herokuapp.com",
                                hostName: "Habr",
                                hostUrl: "https://habr.com/"
                            }
                        }>
                    </RssCard>
                </div>
                <div style={{margin: "0 0 10px 0"}}>
                    <RssCard
                        rssParams = {
                            {
                                rssUrl: "https://tproger.ru/feed/",
                                corsProxyUrl:  "https://cors-anywhere.herokuapp.com",
                                hostName: "Tproger",
                                hostUrl: "https://tproger.ru/"
                            }
                        }>
                    </RssCard>
                </div>
                <div style={{margin: "0 0 10px 0"}}>
                    <RssCard
                        rssParams = {
                            {
                                rssUrl: "https://dou.ua/feed/",
                                corsProxyUrl:  "https://cors-anywhere.herokuapp.com",
                                hostName: "DOU",
                                hostUrl: "https://dou.ua/"
                            }
                        }>
                    </RssCard>
                </div>
                <div style={{margin: "0 0 10px 0"}}>
                    <RssCard
                        rssParams = {
                            {
                                rssUrl: "https://ebanoe.it/feed/",
                                corsProxyUrl:  "https://cors-anywhere.herokuapp.com",
                                hostName: "Ebanoe.IT",
                                hostUrl: "https://ebanoe.it/"
                            }
                        }>
                    </RssCard>
                </div>
            </div>
        );
    }
}

export default App;
