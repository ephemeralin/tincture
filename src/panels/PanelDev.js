import React from "react";
import {devPanelParams} from "../properties";
import {Panel} from "./Panel";

export function PanelDev(props) {
    const {leftCardsParams, rightCardsParams} = devPanelParams;
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
