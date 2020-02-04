import React, {Component} from 'react';
import './css/app.scss';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {Alignment, Navbar, Tab, Tabs} from "@blueprintjs/core";
import {PanelDev} from "./panels/PanelDev";
import {PanelTech} from "./panels/PanelTech";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navbarTabId: "Dev"
        };

        this.handleNavbarTabChange = this.handleNavbarTabChange.bind(this);

        document.body.className = (function () {
            return "bp3-dark";
        })();
    }

    render() {
        const navbarTabId = this.state.navbarTabId;
        let panel;
        if (navbarTabId === "Dev") {
            panel = <PanelDev></PanelDev>;
        } else if (navbarTabId === "Tech") {
            panel = <PanelTech></PanelTech>;
        }
        return (
            <div className="app">
                <Navbar fixedToTop>
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>Tincture</Navbar.Heading>
                        <Navbar.Divider/>
                        <Tabs
                            animate={true}
                            id="navbar"
                            large={true}
                            onChange={this.handleNavbarTabChange}
                            selectedTabId={navbarTabId}
                        >
                            <Tab id="Dev" title="Dev"/>
                            <Tab id="Tech" title="Tech"/>
                        </Tabs>
                    </Navbar.Group>
                </Navbar>

                {panel}

            </div>
        );
    }

    handleNavbarTabChange(navbarTabId) {
        this.setState({navbarTabId});
    }

}

export default App;
