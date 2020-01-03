import React, {Component} from 'react';
import './App.css';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {HabrCard} from "./cards/HabrCard";
import {TprogerCard} from "./cards/TprogerCard";

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
                {/*<HackerNewsCard/>*/}
                <div style={{margin: "0 0 10px 0"}}>
                    <HabrCard/>
                </div>
                <div>
                    <TprogerCard/>
                </div>
            </div>
        );
    }
}

export default App;
