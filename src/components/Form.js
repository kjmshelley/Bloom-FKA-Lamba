import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from 'react-router-dom';

import { post, put } from "../api";

/***********  TASK 7 ****************
 * This should prevent the default behavior and
 * check whether 'values' contains a truthy id. If so, invoke the correct callback
 * to [PUT] an existing quote, otherwise invoke the correct callback
 * to [POST] a new quote.
 * *************************************/
const isEditing = (url = "") => url.indexOf("/add") === -1;


export default function Form() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [id, setID] = useState("");
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [title, setTitle] = useState("");
    const [submitButtonText, setSubmitButtonText] = useState("");
    
    const quotes = useSelector(state => state.quotes);

    const onSubmit = async (evt) => {
        /************ TASK 6 *************************
         * This should prevent the default behavior and
         * reset the form to its original values.
        * *******************************************/
        evt.preventDefault(); // don't actually need this because it's a div element

        setErrorMessage("");

        if (text === "") {
            setErrorMessage("Please input a quote");
            return;
        }
        if (author === "") {
            setErrorMessage("Please input an author");
            return;
        }
        
        try {
            if (isEditing(location.pathname)) {

                /************ TASK 3 *****************
                 * - Use 'axios' or 'fetch' to [PUT] an existing quote
                 * in 'http://localhost:3333/api/quotes/:id'. On success, the updated quote
                 * in the response body should be used to replace the old version of the quote in 'quotes'.
                 * On error, 'handleError' should be called. Finally, the form should be reset.
                 * ***********************************/
                await put(`/quotes/${id}`, { text, author });

            } else {
                
                /************** TASK 2 ***************
                 * - Use 'axios' or 'fetch' to [POST] a new quote
                 * in 'http://localhost:3333/api/quotes'. On success, the new quote
                 * in the response body should be added to the 'quotes' slice of state.
                 * On error, 'handleError' should be called. Finally, the form should be reset.
                *********************************************/
                await post("/quotes", { text, author });

            }

            setErrorMessage("");
            setText("");
            setAuthor("");

            navigate("/");
        } catch (ex) {
            setErrorMessage(ex.message);
        }
    }

    /****************** TASK 8 ******************
     * Obtain 'name' and 'value' from the target of the event,
     * and utilize the correct callback to update the state of the form.
    **********************************************/
    const onTextChange = evt => setText(evt.target.value);
    const onAuthorChange = evt => setAuthor(evt.target.value);
    
    const onCancel = (evt) => {
        evt.preventDefault();
        setText("");
        setAuthor("");
        navigate("/");
    };

    useEffect(() => {
        /****************** TASK 5 **********************
         * This helper should find inside 'quotes' the quote with the given 'id'.
         * Use the 'id', 'text' and 'author' properties of this quote to populate the corresponding
         * fields of the 'formValues' slice of state.
        *******************************************************/
        if (isEditing(location.pathname)) {
            setTitle("Edit Quote");
            setSubmitButtonText("Edit Quote");

            const params = location.pathname.split("/");
            const id = (params.length > 0) ? params[params.length - 1] : -1;
            const quote = quotes.filter(q => q.id === id)[0];

            setID(quote.id);
            setText(quote.text);
            setAuthor(quote.author);
        } else {
            setTitle("Add New Quote");
            setSubmitButtonText("Submit Quote");
        }
    }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="header">
                    <div className="title">{title}</div>
                </div>
                <form className="form" onSubmit={onSubmit}>
                    <input
                        name="text"
                        type="text"
                        value={text}
                        onChange={onTextChange}
                        placeholder="Enter text"
                    />
                    <input
                        name="author"
                        type="text"
                        value={author}
                        onChange={onAuthorChange}
                        placeholder="Enter author"
                    />
                    <div className="error-message">{errorMessage}</div>
                    <div className="actions">
                        <div className="button submit" onClick={onSubmit}>
                            {submitButtonText}
                        </div>
                        <div className="button cancel" onClick={onCancel}>Cancel</div>
                    </div>
                </form>
            </div>
        </div>
    )
}