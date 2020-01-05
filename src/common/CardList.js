import React from "react";

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
                {list.map((item) => (
                        <div key={item.objectID} className="card-list-row">
                            <a href={item.url}>{item.title}</a>
                        </div>
                    )
                )}
            </div>);
    }
}