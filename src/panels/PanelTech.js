import React from "react";
import {commonParams, techPanelParams} from "../properties";
import {Panel} from "./Panel";

export function PanelTech() {
    const {leftCardsParams, rightCardsParams} = techPanelParams;
    return (
        <div>
            <Panel
                leftCardsParams={leftCardsParams}
                rightCardsParams={rightCardsParams}
                commonParams={commonParams}
            >
            </Panel>
        </div>
    );

}
