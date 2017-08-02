import * as types from "../constants/types";
import axios from "axios";

export const postBook = book => {
  // return {
  //   type: types.POST_BOOKS,
  //   payload: book
  // };
  return function(dispatch) {
    axios
      .post("/api/books", book)
      .then(response =>
        dispatch({ type: types.POST_BOOKS, payload: response.data })
      )
      .catch(err =>
        dispatch({ type: types.POST_BOOKS_REJECTED, payload: "Woops!" })
      );
  };
};

export const deleteBook = _id => {
  // return {
  //   type: types.DELETE_BOOKS,
  //   payload: _id
  // };
  return function(dispatch) {
    axios
      .delete("/api/books/" + _id)
      .then(response => dispatch({ type: types.DELETE_BOOKS, payload: _id }))
      .catch(err =>
        dispatch({ type: types.DELETE_BOOKS_REJECTED, payload: err })
      );
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
      .get("/api/books")
      .then(response =>
        dispatch({ type: types.GET_BOOKS, payload: response.data })
      )
      .catch(err => dispatch({ type: types.GET_BOOKS_REJECTED, payload: err }));
  };
};

export const resetButton = () => {
  return {
    type: types.RESET_BUTTON
  };
};
