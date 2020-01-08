import React from "react";
import {techPanelParams} from "../properties";
import {Panel} from "./Panel";

export function PanelTech(props) {
    const {cards} = techPanelParams;
    const corsProxyUrl = props.corsProxyUrl;
    return (
        <div>
            <Panel
                cards={cards}
                corsProxyUrl={corsProxyUrl}
            >
            </Panel>
        </div>
    );

}
