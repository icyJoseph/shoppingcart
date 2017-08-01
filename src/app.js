import React from "react";
import ReactDOM from "react-dom";

import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import reducers from "./reducers/index";
import * as booksActions from "./actions/booksActions";
import * as cartActions from "./actions/cartActions";

import BooksList from "./components/pages/booksList";
import Cart from "./components/pages/cart";
import BooksForm from "./components/pages/booksForm";
import Main from "./main";

import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  hashHistory
} from "react-router";

const middleware = applyMiddleware(logger);
// Store
const store = createStore(reducers, middleware);

// store.subscribe(function() {
//   console.log("Current State is: ", store.getState());
// });

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList} />
        <Route path="/admin" component={BooksForm} />
        <Route path="/cart" component={Cart} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(Routes, document.getElementById("app"));

// store.dispatch(booksActions.deleteBook({ id: 2 }));

// store.dispatch(cartActions.addToCart([{ id: 3 }]));

// store.dispatch(
//   booksActions.updateBook({ id: 1, title: "I gave you a new title" })
// );
