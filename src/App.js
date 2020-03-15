import React, {Component} from 'react';
import './css/app.scss';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {Alignment, Classes, FocusStyleManager, Navbar, Switch, Tab, Tabs} from "@blueprintjs/core";
import {PanelDev} from "./panels/PanelDev";
import {PanelDevEng} from "./panels/PanelDevEng";
import {PanelTech} from "./panels/PanelTech";
import {PanelTechEng} from "./panels/PanelTechEng";
import {PanelJavaEng} from "./panels/PanelJavaEng";
import {PanelLife} from "./panels/PanelLife";
import {PanelLifeEng} from "./panels/PanelLifeEng";

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navbarTabId: "Dev",
            isEng: false
        };

        this.handleNavbarTabChange = this.handleNavbarTabChange.bind(this);
        this.handleIsEngChange = this.handleIsEngChange.bind(this);

        document.body.className = (function () {
            return "bp3-dark";
        })();
    }

    render() {
        console.log("RENDER");
        const navbarTabId = this.state.navbarTabId;
        const isEng = this.state.isEng;
        let panel;
        if (navbarTabId === "Dev") {
            panel = isEng ? <PanelDevEng></PanelDevEng> : <PanelDev></PanelDev>;
        } else if (navbarTabId === "Tech") {
            panel = isEng ? <PanelTechEng></PanelTechEng> : <PanelTech></PanelTech>;
        } else if (navbarTabId === "Life") {
            panel = isEng ? <PanelLifeEng></PanelLifeEng> : <PanelLife></PanelLife>;
        } else if (navbarTabId === "Java") {
            panel = <PanelJavaEng></PanelJavaEng>;
        }
        return (
            <div className="app">
                <Navbar fixedToTop>
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>🦠Tincture</Navbar.Heading>
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
                            <Tab id="Life" title="Life"/>
                            {isEng && <Tab id="Java" title="☕️Java"/>}
                        </Tabs>
                    </Navbar.Group>
                    <Navbar.Group align={Alignment.RIGHT}>

                        {/*<label class="bp3-control bp3-switch .modifier">*/}
                        {/*    <input type="checkbox" modifier />*/}
                        {/*<span class="bp3-control-indicator"></span>*/}
                        {/*Switch*/}
                        {/*</label>*/}

                        <Switch
                            alignIndicator={Alignment.RIGHT}
                            className={Classes.LARGE}
                            checked={isEng}
                            label={isEng ? "English" : "Русский"}
                            onChange={this.handleIsEngChange}
                        />
                    </Navbar.Group>
                </Navbar>

                {panel}

            </div>
        );
    }

    handleNavbarTabChange(navbarTabId) {
        console.log(navbarTabId);
        console.log(this.state.isEng);
        this.setState({navbarTabId});
    }

    handleIsEngChange() {
        let isEng = !this.state.isEng;
        this.setState({isEng});
    }

}

export default App;
