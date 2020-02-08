import React from "react";
import {Card, Elevation} from "@blueprintjs/core";
import {CardList} from "../common/CardList";

export class RssCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            card: props.card,
            error: false,
            slices: {first: [0, 10], second: [10, 20], third: [20, 30]},
        };
        this.setError = this.setError.bind(this);
    }

    render() {
        const {error, slices} = this.state;
        const {feedPrettyName, feedHostUrl, entries, feedName} = this.state.card;
        const title = <h4 style={{margin: 0}}><a href={feedHostUrl}>{feedPrettyName}</a></h4>;
        if (error) {
            return (
                <Card interactive={false} elevation={Elevation.TWO} className="card-object">
                    {title}
                    {<div className="card-data-error">Getting feed error :(</div>}
                </Card>);
        } else if ((!entries) || (entries.length === 0)) {
            return <Card interactive={false} elevation={Elevation.TWO} className="card-object">
                {title}
                <div className="card-column">
                    <CardList list={entries}/>
                </div>
            </Card>;
        } else {
            const iconPath = "icons/" + feedName + ".png";
            return (
                <Card interactive={false} elevation={Elevation.TWO} className="card-object">
                    <div className="card-logo">
                        <img src={iconPath} style={{height: '16px'}}/>
                    </div>
                    <div className="card-title">
                        {title}
                    </div>

                    {<div>
                        <div className="card-column">
                            <CardList list={entries.slice(...slices.first)}/>
                        </div>
                    </div>}
                </Card>);
        }
    }

    setError(error) {
        this.setState({error});
    }

}

