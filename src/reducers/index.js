"user-strict";

import { combineReducers } from "redux";
import  booksReducers from "./booksReducers";
import  cartReducers  from "./cartReducers";

const rootReducer = combineReducers({
  books: booksReducers,
  cart: cartReducers
});

export default rootReducer;
