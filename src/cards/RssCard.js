import React from "react";
import {Card, Classes, Elevation, Overlay} from "@blueprintjs/core";
import {CardList} from "../common/CardList";
import classNames from "classnames";
import '../css/overlay.scss';

const OVERLAY_EXAMPLE_CLASS = "overlay-transition";
const OVERLAY_TALL_CLASS = "overlay-tall";

export class RssCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            card: props.card,
            error: false,
            slices: {first: [0, 10], second: [10, 20], third: [20, 30]},
            isOpen: false,
            useTallContent: false
        };
        this.setError = this.setError.bind(this);
    }

    render() {
        const {error, slices} = this.state;
        const {feedPrettyName, feedHostUrl, entries, feedName, feedUpdated} = this.state.card;
        const title = <h4 style={{margin: 0}}><a href={feedHostUrl}>{feedPrettyName}</a></h4>;
        const classes = classNames(
            Classes.CARD,
            Classes.ELEVATION_4,
            OVERLAY_EXAMPLE_CLASS,
            {[OVERLAY_TALL_CLASS]: this.state.useTallContent},
        );

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
                    <CardOverlay
                        classes={classes}
                        iconPath={iconPath}
                        title={title}
                        entries={entries}
                        parent={this}
                    >
                    </CardOverlay>

                    <div className="card-logo">
                        <img src={iconPath} alt="" style={{height: '16px'}}/>
                    </div>
                    <div className="card-title">
                        {title}
                    </div>
                    <div className="show-more">
                        <button className="show-more-button" onClick={this.handleOpen}>more...</button>
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

    handleOpen = () => this.setState({isOpen: true});
    handleClose = () => this.setState({isOpen: false, useTallContent: false});
}

const CardOverlay = ({classes, iconPath, title, entries, parent}) =>
    <Overlay
        className={Classes.OVERLAY_SCROLL_CONTAINER}
        isOpen={parent.state.isOpen}
        onClose={parent.handleClose}
        canEscapeKeyClose={true}
        autoFocus={true}
        canOutsideClickClose={true}
        enforceFocus={true}
        hasBackdrop={true}
        usePortal={true}
        useTallContent={false}
        transitionName={Classes.OVERLAY}
        lazy={true}
    >
        <div className={classes}>
            <div className="card-logo">
                <img src={iconPath} alt="" style={{height: '16px'}}/>
            </div>
            <div className="card-title">
                {title}
            </div>
            <div className="overlay-close">
                <button className="overlay-close-button" onClick={parent.handleClose}>close</button>
            </div>
            {<div>
                <div className="card-column">
                    <CardList list={entries}/>
                </div>
            </div>}
        </div>

    </Overlay>


