import React from "react";
import {techPanelParams} from "../properties";
import {Panel} from "./Panel";

export function PanelTech(props) {
    const {leftCardsParams, rightCardsParams} = techPanelParams;
    const corsProxyUrl = props.corsProxyUrl;
    return (
        <div>
            <Panel
                leftCardsParams={leftCardsParams}
                rightCardsParams={rightCardsParams}
                corsProxyUrl={corsProxyUrl}
            >
            </Panel>
        </div>
    );

}
