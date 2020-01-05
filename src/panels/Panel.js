import React from "react";
import {RssCard} from "../cards/RssCard";

export class Panel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commonParams: props.commonParams,
            leftCardsParams: props.leftCardsParams,
            rightCardsParams: props.rightCardsParams
        }
    }

    render() {
        const {commonParams, leftCardsParams, rightCardsParams} = this.state;
        return (
            <div>
                {leftCardsParams.map((card, i) => (
                        (i < rightCardsParams.length) ?
                            <div className="card-block" style={{margin: "8px 0px 0px 0px"}}>
                                <div className="card-div">
                                    <div style={{margin: "0px 5px 0px 0px"}}>
                                        <RssCard
                                            rssParams={card}
                                            commonParams={commonParams}>
                                        </RssCard>
                                    </div>
                                </div>
                                <div className="card-div">
                                    <div style={{margin: "0px 0px 0px 5px"}}>
                                        <RssCard
                                            rssParams={rightCardsParams[i]}
                                            commonParams={commonParams}>
                                        </RssCard>
                                    </div>
                                </div>
                            </div> :
                            <div className="card-block" style={{margin: "8px 0px 0px 0px"}}>
                                <div className="card-div">
                                    <div style={{margin: "0px 5px 0px 0px"}}>
                                        <RssCard
                                            rssParams={card}
                                            commonParams={commonParams}>
                                        </RssCard>
                                    </div>
                                </div>
                            </div>
                    )
                )}
            </div>


        )

    }
}
