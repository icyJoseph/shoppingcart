"use-strict";

import * as types from '../constants/types'

// Books Reducers

const initialState = {books: [
    {
      _id: 1,
      title: "Title of the book",
      price: 111,
      description: "Description of the book"
    },
    {
      _id: 2,
      title: "Title of another book",
      price: 90,
      description: "Description of another book"
    }
  ]}
export default function booksReducers(
  state = initialState,
  action
) {
  switch (action.type) {
    case types.POST_BOOKS:
      // let books = state.books.concat(action.payload);
      // return {books}
      return { books: [...state.books, ...action.payload] };
    case types.DELETE_BOOKS:
      // get a copy of the state
      const currentBookToDelete = [...state.books];
      // find the actual index of the book to remove (array index)
      const indexToDelete = currentBookToDelete.findIndex(
        book => book._id == action.payload._id
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
        ...state, books:[...state.books]
      }
    default:
      return state;
  }
}
