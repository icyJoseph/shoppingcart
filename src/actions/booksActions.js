import * as types from "../constants/types";

export const postBook = book => {
  return {
    type: types.POST_BOOKS,
    payload: book
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
  return {
    type: types.GET_BOOKS
  };
};
