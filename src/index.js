import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./components/App";
import Form from "./components/Form";
import './index.less';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/quotes/:id" element={<Form />} />
        <Route path="/quotes/add" element={<Form />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
