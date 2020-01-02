import React from "react";
import {Card, Elevation} from "@blueprintjs/core";
import {CardList} from "../common/CardList";

const CORS_API_HOST = 'https://cors-anywhere.herokuapp.com';
// const CORS_API_HOST = 'https://crossorigin.me';
// const CORS_API_HOST = 'https://test.cors.workers.dev';
const PATH_BASE = 'https://habr.com/ru/rss/best/daily/';

export class HabrCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            result: null,
            error: false
        };
        this.setResult = this.setResult.bind(this);
        this.setError = this.setError.bind(this);
    }

    render() {
        const {result, error} = this.state;
        const list = result;
        const slices = {first: [0, 10], second: [10, 20], third: [20, 30]};
        if (error) {
            return (
                <Card interactive={false} elevation={Elevation.TWO} style={{overflow: "hidden"}}>
                    <h4 style={{margin: 0}}><a href="https://habr.com/">Habr</a></h4>
                    {<div className="card-data-error">Getting feed error :(</div>
                    }
                </Card>);
        } else if (!list) {
            return <Card interactive={false} elevation={Elevation.TWO} style={{overflow: "hidden"}}>
                <h4 style={{margin: 0}}><a href="https://habr.com/">Habr</a></h4>
            </Card>;
        }else {
            return (
                <Card interactive={false} elevation={Elevation.TWO} style={{overflow: "hidden"}}>
                    <h4 style={{margin: 0}}><a href="https://habr.com/">Habr</a></h4>
                    {<div>
                        <div className="card-column">
                            <CardList list={list.slice(...slices.first)}/>
                        </div>
                        <div className="card-column">
                            <CardList list={list.slice(...slices.second)}/>
                        </div>
                    </div>
                    }
                </Card>);
        }
    }

    componentDidMount() {

        let list = [];
        let i = 0;
        fetch(`${CORS_API_HOST}/${PATH_BASE}`,
            {
                // method: "get",
                // mode: "cors",
                // headers: {
                //     'Access-Control-Allow-Origin': "http://localhost:3000",
                //     'Access-Control-Allow-Headers': 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name',
                // }
            })
            .then(response => response.text())
            .then((xmlTxt) => {
                const domParser = new DOMParser();
                const doc = domParser.parseFromString(xmlTxt, 'text/xml');
                doc.querySelectorAll('item').forEach((item) => {
                    const element = {
                        title: item.querySelector('title').textContent,
                        url: item.querySelector('link').textContent,
                        objectID: item.querySelector('guid').textContent
                    };
                    console.log("-- " + JSON.stringify(element));
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
    }

    setResult(result) {
        this.setState({result});
    }

    setError(error) {
        this.setState({error});
    }
}

