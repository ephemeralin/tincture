import React, {Component} from 'react';
import './App.css';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {RssCard} from "./cards/RssCard";
import {commonParams, leftCardsParams, rightCardsParams} from "./properties.json"

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
                {leftCardsParams.map((card, i) => (
                        (i < rightCardsParams.length) ?
                            <div className="card-block" style={{margin: "8px 0px 0px 0px"}}>
                                <div className="card-div">
                                    <div style={{margin: "0px 5px 0px 0px"}}>
                                        <RssCard
                                            rssParams={card}
                                            commonParams={commonParams}>
                                        </RssCard>
                                    </div>
                                </div>
                                <div className="card-div">
                                    <div style={{margin: "0px 0px 0px 5px"}}>
                                        <RssCard
                                            rssParams={rightCardsParams[i]}
                                            commonParams={commonParams}>
                                        </RssCard>
                                    </div>
                                </div>
                            </div> :
                            <div className="card-block" style={{margin: "8px 0px 0px 0px"}}>
                                <div className="card-div">
                                    <div style={{margin: "0px 5px 0px 0px"}}>
                                        <RssCard
                                            rssParams={card}
                                            commonParams={commonParams}>
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
