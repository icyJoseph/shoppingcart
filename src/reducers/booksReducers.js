"use-strict";

import * as types from "../constants/types";

// Books Reducers

const initialState = { books: [] };

export default function booksReducers(state = initialState, action) {
  switch (action.type) {
    case types.POST_BOOKS:
      // let books = state.books.concat(action.payload);
      // return {books}
      return {
        books: [...state.books, ...action.payload],
        msg: "Saved! Click to Continue",
        style: "success",
        validation: "success"
      };
    case types.POST_BOOKS_REJECTED:
      return {
        ...state,
        msg: "Please, try again",
        style: "danger",
        validation: "error"
      };

    case types.RESET_BUTTON:
      return { ...state, msg: null, style: null, validation: null };
    case types.DELETE_BOOKS:
      // get a copy of the state
      const currentBookToDelete = [...state.books];
      // find the actual index of the book to remove (array index)
      let indexToDelete = currentBookToDelete.findIndex(
        books => books._id == action.payload
      );
      // Slide the object from the beginning to the index -1 and from index + 1 to the end, clever use of spread...

      return {
        books: [
          ...currentBookToDelete.slice(0, indexToDelete),
          ...currentBookToDelete.slice(indexToDelete + 1)
        ]
      };
    case types.UPDATE_BOOKS:
      // get a copy of the state
      const currentBookToUpdate = [...state.books];
      // with the index of the book to update change its title
      return {
        books: currentBookToUpdate.map(
          book =>
            book._id === action.payload._id
              ? { ...book, title: action.payload.title }
              : book
        )
      };
    case types.GET_BOOKS:
      return {
        ...state,
        books: [...action.payload]
      };
    default:
      return state;
  }
}
