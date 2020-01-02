import React, {Component} from 'react';
import './App.css';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {HackerNewsCard} from "./cards/HackerNewsCard";
import {HabrCard} from "./cards/HabrCard";

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
                <HabrCard/>
            </div>
        );
    }
}

export default App;
