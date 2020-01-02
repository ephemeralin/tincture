import React, {Component} from 'react';
import './App.css';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {HackerNewsCard} from "./HackerNewsCard";

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
                <div className="app-header">
                    <HackerNewsCard/>
                </div>
            </div>
        );
    }
}

export default App;
