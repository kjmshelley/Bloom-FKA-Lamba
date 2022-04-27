import React from 'react';
import { Link } from "react-router-dom";

import TrashCanSVG from "./svgs/TrashCanSVG";
import PencilSVG from "./svgs/PencilSVG";


export default function Quote({ quote, onDelete}) {
    const {
        id,
        text,
        author
    } = quote;

    return (
        <li className="quote">
            <div className="quote-info">
                <div>{text}</div>
                <div className="author">{author}</div>
            </div>
            <div className="actions">
                <div className="edit-button">
                    <Link to={`/quotes/${id}`}><PencilSVG /></Link>
                </div>
                <div className="delete-button" onClick={() => onDelete(id)}><TrashCanSVG /></div>
            </div>
        </li>
    )
};