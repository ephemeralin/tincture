import React from "react";
import {Card, Elevation} from "@blueprintjs/core";
import {CardList} from "../common/CardList";

export class RssCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rssParams: props.rssParams,
            result: null,
            error: false
        };
        this.setResult = this.setResult.bind(this);
        this.setError = this.setError.bind(this);
    }

    render() {
        const {result, error} = this.state;
        const {hostName, hostUrl} = this.state.rssParams;
        const list = result;
        const slices = {first: [0, 10], second: [10, 20], third: [20, 30]};
        const title = <h4 style={{margin: 0}}><a href={hostUrl}>{hostName}</a></h4>;
        if (error) {
            return (
                <Card interactive={false} elevation={Elevation.TWO} className="card-object">
                    {title}
                    {<div className="card-data-error">Getting feed error :(</div>}
                </Card>);
        } else if (!list) {
            return <Card interactive={false} elevation={Elevation.TWO} className="card-object">
                {title}
            </Card>;
        } else {
            return (
                <Card interactive={false} elevation={Elevation.TWO} className="card-object" style={{width: "100%"}}>
                    {title}
                    {<div>
                        <div className="card-column">
                            <CardList list={list.slice(...slices.first)}/>
                        </div>
                    </div>}
                </Card>);
        }
    }

    componentDidMount() {

        let list = [];
        let i = 0;
        const {rssUrl, corsProxyUrl} = this.state.rssParams;
        if (rssUrl && corsProxyUrl) {
            fetch(`${corsProxyUrl}/${rssUrl}`)
                .then(response => response.text())
                .then((xmlTxt) => {
                    const domParser = new DOMParser();
                    const doc = domParser.parseFromString(xmlTxt, 'text/xml');

                    let items = this.getItemsElement(doc);
                    items.forEach((item) => {
                        const element = {
                            title: item.querySelector('title').textContent,
                            url: item.querySelector('link').textContent,
                            objectID: this.getIdElement(doc).textContent
                        };
                        list[i++] = element;
                    });
                    this.setError(false);
                    return list
                })
                .then(result => this.setResult(result))
                .catch(error => {
                    console.error('Error in fetching the website ' + error.toString());
                    this.setError(true);
                });
        } else {
            this.setError(true);
        }
    }

    setResult(result) {
        this.setState({result});
    }

    setError(error) {
        this.setState({error});
    }

    getItemsElement(doc) {
        let items = doc.querySelectorAll('item');
        if (items.length === 0) {
           items = doc.querySelectorAll('entry');
        }
        return items;
    }

    getIdElement(doc) {
        let id = doc.querySelector('guid');
        if (!id) {
            id = doc.querySelector('id');
        }
        return id;
    }
}

