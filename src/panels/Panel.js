import React from "react";
import {RssCard} from "../cards/RssCard";

const excludeOff = item => !item.off;

export class Panel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            corsProxyUrl: props.corsProxyUrl,
            cards: props.cards,
        }
    }

    render() {
        const {corsProxyUrl, cards} = this.state;
        return (
            <div>
                {cards.filter(excludeOff).map((card, i) => (
                        <div className="card-div">
                            <div className="card-div-2">
                                <RssCard
                                    rssParams={card}
                                    corsProxyUrl={corsProxyUrl}>
                                </RssCard>
                            </div>
                        </div>
                    )
                )}
            </div>
        )
    }
}
