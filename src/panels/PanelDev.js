import React from "react";
import {commonParams, devPanelParams} from "../properties";
import {Panel} from "./Panel";

export function PanelDev() {
    const {leftCardsParams, rightCardsParams} = devPanelParams;
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
