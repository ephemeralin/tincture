import React, {Component} from 'react';
import {Button, Intent} from "@blueprintjs/core";
import './App.css';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: "react"
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

    document.body.className = (function () {
      return "bp3-dark";
    })();
  }

  setSearchTopStories(result) {
    this.setState({result});
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
        .then(response => response.json())
        .then(result => this.setSearchTopStories(result))
        .catch(error => error);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: {...this.state.result, hits: updatedHits}
    });
  }

  render() {
    const {searchTerm, result} = this.state;
    if (!result) {
      return null
    }
    return (
        <div className="app">
          <div className="app-header">
            <Table
                list={result.hits}
                pattern={searchTerm}
                onDismiss={this.onDismiss}
            />
            <Button intent={Intent.SUCCESS} text="Green button"/>
          </div>
        </div>
    );
  }
}

const Table = ({list, onDismiss}) =>
    <div className="table">
      {list.map((item) => (
          <div key={item.objectID} className="table-row">
                    <span style={{width: '56%'}}>
                        <a href={item.url}>{item.title}</a>
                    </span>
            <span style={{width: '20%'}}>{item.author}</span>
            <span style={{width: '6%'}}>{item.num_comments}</span>
            <span style={{width: '6%'}}>{item.points}</span>
            <span style={{width: '12%'}}>
                    <MyButton
                        onClick={() => onDismiss(item.objectID)}
                        className="button-inline">Dismiss
                    </MyButton>
                </span>
          </div>)
      )}
    </div>;


const MyButton = ({children, onClick}) =>
    <Button
        onClick={onClick}
        type="button"
        intent="danger"
    >
      {children}
    </Button>;


export default App;
