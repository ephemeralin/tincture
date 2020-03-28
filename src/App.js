import React, {Component} from 'react';
import {useMediaPredicate} from "react-media-hook";
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
        // const biggerThan400 = useMediaPredicate("(min-width: 400px)");
        let navbarTabId = this.state.navbarTabId;
        const isEng = this.state.isEng;
        let panel;
        if (navbarTabId === "Dev") {
            panel = isEng ? <PanelDevEng></PanelDevEng> : <PanelDev></PanelDev>;
        } else if (navbarTabId === "Tech") {
            panel = isEng ? <PanelTechEng></PanelTechEng> : <PanelTech></PanelTech>;
        } else if (navbarTabId === "Life") {
            panel = isEng ? <PanelLifeEng></PanelLifeEng> : <PanelLife></PanelLife>;
        } else if (navbarTabId === "Java") {
            if (isEng) {
                panel = <PanelJavaEng></PanelJavaEng>;
            } else {
                panel = <PanelDev></PanelDev>;
                navbarTabId = "Dev";
            }
        }
        return (
            <div className="app">
                <Navbar fixedToTop>
                    <Navbar.Group align={Alignment.LEFT}>
                        <NavbarHeader/>
                        <NavbarDividerResp/>
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
                            {isEng && <Tab id="Java" title="Java"/>}
                        </Tabs>
                    </Navbar.Group>
                    <Navbar.Group align={Alignment.RIGHT}>
                        <div className="isEngSwitch">
                            <Switch innerLabel=<SwitchInnerLabel isEng={isEng}/>
                            alignIndicator={Alignment.RIGHT}
                            className={Classes.LARGE}
                            checked={isEng}
                            label=<SwitchLabel isEng={isEng}/>
                            onChange={this.handleIsEngChange}
                            />
                        </div>
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

const NavbarHeader = () => {
    const biggerThan450 = useMediaPredicate("(min-width: 450px)");

    if (biggerThan450) {
        return <div>
            {<Navbar.Heading>🦠Tincture</Navbar.Heading>}
        </div>
    } else {
        return <div>
            {<Navbar.Heading>🦠</Navbar.Heading>}
        </div>
    }
};

const SwitchLabel = (props) => {
    const {isEng} = props;
    const biggerThan400 = useMediaPredicate("(min-width: 375px)");
    if (biggerThan400) {
        return isEng ? "English" : "Русский";
    } else {
        return ""
    }
};

const SwitchInnerLabel = (props) => {
    const {isEng} = props;
    const biggerThan375 = useMediaPredicate("(min-width: 375px)");
    const biggerThan332 = useMediaPredicate("(min-width: 332px)");
    if (biggerThan375) {
        return ""
    } else {
        if (biggerThan332) {
            return isEng ? "Eng" : "Rus";
        } else {
            return isEng ? "E" : "R";
        }
    }
};

const NavbarDividerResp = () => {
    const biggerThan450 = useMediaPredicate("(min-width: 450px)");
    if (biggerThan450) {
        return <Navbar.Divider/>
    } else {
        return "";
    }
};


export default App;
