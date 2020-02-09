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
        const {feedPrettyName, feedHostUrl, entries, feedName, feedUpdated} = this.state.card;
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
            const updatedString = this.getUpdated(feedUpdated);
            return (
                <Card interactive={false} elevation={Elevation.TWO} className="card-object">
                    <div className="card-logo">
                        <img src={iconPath} style={{height: '16px'}}/>
                    </div>
                    <div className="card-title">
                        {title}
                    </div>
                    <div className="card-updated">
                        {updatedString}
                    </div>

                    {<div>
                        <div className="card-column">
                            <CardList list={entries.slice(...slices.first)}/>
                        </div>
                    </div>}
                </Card>);
        }
    }

    getUpdated(feedUpdated) {
        let result = '';
        const feedUpdatedMillis = Date.parse(feedUpdated.replace('[UTC]', ''));
        if (!isNaN(feedUpdatedMillis)) {
            result = this.getUpdatedString(Math.round((Date.now() - feedUpdatedMillis) / 1000 / 60));
        }
        return result;
    }

    getUpdatedString(updatedMins) {
        let result = '';
        let hours = Math.floor(updatedMins / 60);
        if (hours > 0) {
            const remainMins = updatedMins - hours * 60;
            result = 'updated ' + this.formatHours(hours) + this.formatMinutes(remainMins) + 'ago';
        } else {
            result = 'updated ' + this.formatMinutes(updatedMins) + 'ago';
        }
        return result;
    }

    formatHours(h) {
        if (h === 1 || (h % 10 === 1 && (h % 100) > 19)) {
            return h + ' hour ';
        }
        return h + ' hours ';
    }

    formatMinutes(m) {
        if (m === 1 || m % 10 === 1) {
            return m + ' minute ';
        }
        return m + ' minutes ';
    }

    setError(error) {
        this.setState({error});
    }

}

