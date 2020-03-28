import React from "react";
import {RssCard} from "../cards/RssCard";

export class Panel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            panel_name: props.panel_name,
            api_host: process.env.REACT_APP_API_HOST,
            feeds: []
        };
        this.setFeeds = this.setFeeds.bind(this);
    }

    render() {
        const {feeds} = this.state;
        return (
            <div>
                {feeds.map((card, i) => (
                        <div key={i} className="card-div">
                            <div className="card-div-2">
                                <RssCard
                                    card={card}>
                                </RssCard>
                            </div>
                        </div>
                    )
                )}
            </div>
        )
    }

    componentDidMount() {
        let url = new URL(this.state.api_host + 'feeds/');
        var params = {feedArea: this.state.panel_name};
        url.search = new URLSearchParams(params).toString();
        fetch(url, {
            method: "GET"
        })
            .then(response => response.json())
            .then((result) => {
                let feeds = result;
                return feeds;
            })
            .then(list => this.setFeeds(list))
            .catch(error => {
                console.error("fetch error: ");
                console.error(error);
            });
    }

    setFeeds(feeds) {
        this.setState({feeds});
    }

}
