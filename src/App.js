import React, {Component} from 'react';
import './App.css';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {HabrCard} from "./cards/HabrCard";
import {TprogerCard} from "./cards/TprogerCard";
import {DouCard} from "./cards/DouCard";
import {EbanoeItCard} from "./cards/EbanoeItCard";

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
                    <HabrCard/>
                </div>
                <div style={{margin: "0 0 10px 0"}}>
                    <TprogerCard/>
                </div>
                <div style={{margin: "0 0 10px 0"}}>
                    <DouCard/>
                </div>
                <div style={{margin: "0 0 10px 0"}}>
                    <EbanoeItCard/>
                </div>
            </div>
        );
    }
}

export default App;
