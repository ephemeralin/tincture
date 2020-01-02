import React from "react";
import {Card, Elevation} from "@blueprintjs/core";
import {CardTable} from "../common/CardTable";

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

export class HackerNewsCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            result: null,
            searchTerm: "java"
        };
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
    }

    render() {
        const {result} = this.state;
        if (!result) {
            return null
        }
        const list = result.hits;
        const slices = {first: [0, 10], second: [10, 20], third: [20, 30]};
        return <Card interactive={false} elevation={Elevation.TWO}>
            <h4 style={{margin: 0}}><a href="https://news.ycombinator.com/">Hacker News</a></h4>
            <div style={{display: "inline-block"}}>
                <CardTable list={list.slice(...slices.first)}/>
            </div>
            <div style={{display: "inline-block"}}>
                <CardTable list={list.slice(...slices.second)}/>
            </div>
            <div style={{display: "inline-block"}}>
                <CardTable list={list.slice(...slices.third)}/>
            </div>
        </Card>;
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    }

    setSearchTopStories(result) {
        this.setState({result});
    }
}

