import React from "react";
import Quote from "./Quote";

export default function Quotes({ quotes, onDelete }) {
    return (
        <div className="quotes">
            <ul>
                {quotes.map(q => <Quote key={q.id} quote={q} onDelete={onDelete} />)}
            </ul>
        </div>
    )
};