import React from "react";
import {Card, Elevation} from "@blueprintjs/core";
import {CardList} from "../common/CardList";

export class RssCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rssParams: props.rssParams,
            corsProxyUrl: props.corsProxyUrl,
            list: null,
            error: false,
            slices: {first: [0, 10], second: [10, 20], third: [20, 30]}
        };
        this.setList = this.setList.bind(this);
        this.setError = this.setError.bind(this);
    }

    render() {
        const {list, error, slices} = this.state;
        const {hostName, hostUrl} = this.state.rssParams;
        const title = <h4 style={{margin: 0}}><a href={hostUrl}>{hostName}</a></h4>;
        if (error) {
            return (
                <Card interactive={false} elevation={Elevation.TWO} className="card-object">
                    {title}
                    {<div className="card-data-error">Getting feed error :(</div>}
                </Card>);
        } else if ((!list) || (list.length === 0)) {
            return <Card interactive={false} elevation={Elevation.TWO} className="card-object">
                {title}
                <div className="card-column">
                    <CardList list={list}/>
                </div>
            </Card>;
        } else {
            return (
                <Card interactive={false} elevation={Elevation.TWO} className="card-object">
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
        const {rssUrl} = this.state.rssParams;
        const corsProxyUrl = this.state.corsProxyUrl;
        if (rssUrl && corsProxyUrl) {
            fetch(`${corsProxyUrl}?url=${rssUrl}`)
                .then(response => response.text())
                .then((xmlTxt) => {
                    const domParser = new DOMParser();
                    const doc = domParser.parseFromString(xmlTxt, 'text/xml');

                    let items = this.getItemsElement(doc);
                    items.forEach((item) => {
                        list[i++] = {
                            title: item.querySelector('title').textContent,
                            url: item.querySelector('link').textContent,
                            objectID: this.getIdElement(item).textContent
                        };
                    });
                    this.setError(false);
                    return list
                })
                .then(list => this.setList(list))
                .catch(error => {
                    console.error('Error in fetching the website ' + error.toString());
                    this.setError(true);
                });
        } else {
            this.setError(true);
        }
    }

    setList(list) {
        this.setState({list});
    }

    setError(error) {
        this.setState({error});
    }

    getItemsElement(obj) {
        let items = obj.querySelectorAll('item');
        if (items.length === 0) {
            items = obj.querySelectorAll('entry');
        }
        return items;
    }

    getIdElement(obj) {
        let id = obj.querySelector('guid');
        if (!id) {
            id = obj.querySelector('id');
        }
        return id;
    }
}

