import React from "react";

export function CardTable(props) {
    let {list} = props;
    return (
        <div className={`HTMLTable card-table`}>
            {
                list.map((item) => (
                        <tr key={item.objectID} className="card-table-row">
                            <span style={{width: '100%'}}>
                                <a href={item.url}>{item.title}</a>
                            </span>
                        </tr>
                    )
                )
            }
        </div>
    );
}