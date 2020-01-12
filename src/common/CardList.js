import React from "react";
import {Popover} from "@blueprintjs/core";
import ReactHtmlParser from 'react-html-parser';
import '../css/app.scss';
import '../css/card.scss';
import '../css/popover.scss';

export function CardList(props) {
    const {list} = props;

    if ((!list) || (list.length === 0)) {
        const emptyList = [...Array(10).keys()];
        return (
            <div>
                {emptyList.map((item) => <div className="card-list-row-empty">{item.toString()}</div>)}
            </div>);
    } else {
        return (
            <div>
                {list.map((item) => <div key={item.objectID} className="card-list-row">
                        <TPopover item={item}>
                        </TPopover>
                    </div>
                )}
            </div>);
    }
}

const TPopover = ({item}) =>
    <Popover className="popover-object"
             enforceFocus={false}
             inheritDarkTheme={true}
             popoverClassName="popover-object bp3-popover bp3-dark bp3-popover-content bp3-popover-arrow"
             position="auto"
             canEscapeKeyClose={true}
             usePortal={true}
             content=
                 {<div>
                     <div className="popover-text-header">
                         <a href={item.url} className="popover-text-header-font">{item.title}</a>
                     </div>
                     <div className="popover-content">
                         <div className="popover-text"> {
                             ReactHtmlParser(item.description, {
                                 transform: node => {
                                     if (node.type === 'tag' && node.name === 'img') {
                                         return (<img className="popover-img" src={node.attribs.src}/>);
                                     }
                                 }
                             })
                         } </div>
                     </div>
                 </div>}
    >
        <a>{item.title}</a>
    </Popover>