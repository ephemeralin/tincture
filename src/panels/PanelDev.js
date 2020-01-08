import React from "react";
import {devPanelParams} from "../properties";
import {Panel} from "./Panel";

export function PanelDev(props) {
    const {cards} = devPanelParams;
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
