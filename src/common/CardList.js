import React from "react";

export function CardList(props) {
    const {list} = props;
    return (
        <div>
            {list.map((item) => (
                    <div key={item.objectID} className="card-list-row">
                        <a href={item.url}>{item.title}</a>
                    </div>
                )
            )}
        </div>
    );
}