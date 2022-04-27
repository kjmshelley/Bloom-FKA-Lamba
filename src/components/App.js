import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { get, del } from '../api';
import QuoteList from "./Quotes";

export default function App() {
  const quotes = useSelector(state => state.quotes);
  const dispatch = useDispatch();

  const getQuotes = () => {
    (async () => {
      try {
        /*************** TASK 1*************
         * Use 'axios' or 'fetch' to [GET] a list of quotes
         * from 'http://localhost:3333/api/quotes'. On success, the quotes
         * in the response body should be set as the 'quotes' slice of state.
         * On error, 'handleError' should be called.`
         * ***********************************************/
        const data = await get('/quotes');
        dispatch({ type: "app/load", payload: data });
      } catch (ex) {
        handleError(ex);
      }
    })();
  }


  const deleteQuote = async (id) => {
    /***************** TASK 4 *******************
     * - Use 'axios' or 'fetch' to [DELETE] an existing quote
     * in 'http://localhost:3333/api/quotes/:id'. On success, the deleted quote
     * should be removed from the 'quotes' slice of state'.
     * On error, 'handleError' should be called. Finally, the form should be reset.
      ******************************************* */
    if(!id) return;

    /* I just used an alert for simplicity */
    let shouldDelete = confirm("Are you sure you want to delete this quote?");
    if (!shouldDelete) return;

    try {
        const data = await del(`/quotes/${id}`);
        if (data !== id) throw Error("Delete unsuccessful");

        dispatch({ type: "quote/delete", payload: quotes.filter(q => q.id !== id) });

    } catch (ex) {
        console.log(ex);
        handleError();
    } 
  }

  const handleError = err => { debugger } // eslint-disable-line

  useEffect(() => getQuotes(), [])

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <div className="title">Quotes of the Day</div>
          <div className="button add">
            <Link to={`/quotes/add`}>Add</Link>
          </div>
        </div>
        <QuoteList
          quotes={quotes}
          onDelete={deleteQuote} />
      </div>
    </div>
  )
}
