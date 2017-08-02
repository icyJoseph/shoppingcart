import React from "react";
import ReactDOM from "react-dom";

import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducers from "./reducers/index";
import * as booksActions from "./actions/booksActions";
import * as cartActions from "./actions/cartActions";

import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  hashHistory
} from "react-router";

import routes from "./routes";

const middleware = applyMiddleware(thunk, logger);
// Passing initial state from server to store
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
);

ReactDOM.render(Routes, document.getElementById("app"));
