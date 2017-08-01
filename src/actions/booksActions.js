import * as types from "../constants/types";
import axios from "axios";

export const postBook = book => {
  // return {
  //   type: types.POST_BOOKS,
  //   payload: book
  // };
  return function(dispatch) {
    axios
      .post("/books", book)
      .then(response =>
        dispatch({ type: types.POST_BOOKS, payload: response.data })
      )
      .catch(err =>
        dispatch({ type: types.POST_BOOKS_REJECTED, payload: "Woops!" })
      );
  };
};

export const deleteBook = _id => {
  return {
    type: types.DELETE_BOOKS,
    payload: _id
  };
};

export const updateBook = book => {
  return {
    type: types.UPDATE_BOOKS,
    payload: book
  };
};

export const getBooks = () => {
  // return {
  //   type: types.GET_BOOKS
  // };
  return function(dispatch) {
    axios
      .get("/books")
      .then(response =>
        dispatch({ type: types.GET_BOOKS, payload: response.data })
      )
      .catch(err =>
        dispatch({ type: types.GET_BOOKS_REJECTED, payload: ":(" })
      );
  };
};
