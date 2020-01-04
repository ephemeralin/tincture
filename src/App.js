import React, {Component} from 'react';
import './App.css';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {RssCard} from "./cards/RssCard";
import {leftCards} from "./properties.json"
import {rightCards} from "./properties.json"

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
                {leftCards.map((card, i) => (
                        (i < rightCards.length) ?
                        <div className="card-block" style={{margin: "8px 0px 0px 0px"}}>
                            <div className="card-div">
                                <div style={{margin: "0px 5px 0px 0px"}}>
                                    <RssCard
                                        rssParams={card}>
                                    </RssCard>
                                </div>
                            </div>
                            <div className="card-div">
                                <div style={{margin: "0px 0px 0px 5px"}}>
                                    <RssCard
                                        rssParams={rightCards[i]}>
                                    </RssCard>
                                </div>
                            </div>
                        </div> :
                        <div className="card-block" style={{margin: "8px 0px 0px 0px"}}>
                            <div className="card-div">
                                <div style={{margin: "0px 5px 0px 0px"}}>
                                    <RssCard
                                        rssParams={card}>
                                    </RssCard>
                                </div>
                            </div>

                        </div>

                )
                )}
            </div>

        );
    }
}

export default App;
