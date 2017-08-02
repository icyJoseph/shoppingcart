import * as types from "../constants/types";
import axios from "axios";

export const getCart = () => {
  return function(dispatch) {
    axios
      .get("/api/cart")
      .then(response =>
        dispatch({ type: types.GET_CART, payload: response.data })
      )
      .catch(err => dispatch({ type: types.GET_CART_REJECTED, payload: err }));
  };
};

export const addToCart = cart => {
  // return {
  //   type: types.ADD_TO_CART,
  //   payload: book
  // };
  return function(dispatch) {
    axios
      .post("/api/cart", cart)
      .then(response =>
        dispatch({ type: types.ADD_TO_CART, payload: response.data })
      )
      .catch(err =>
        dispatch({ type: types.ADD_TO_CART_REJECTED, payload: err })
      );
  };
};

export const deleteCartItem = cart => {
  // return {
  //   type: types.DELETE_CART_ITEM,
  //   payload: cart
  // };
  return function(dispatch) {
    axios
      .post("/api/cart", cart)
      .then(response =>
        dispatch({ type: types.DELETE_CART_ITEM, payload: response.data })
      )
      .catch(err =>
        dispatch({ type: types.DELETE_CART_ITEM_REJECTED, payload: err })
      );
  };
};

export const updateCart = (_id, unit, cart) => {
  const currentCart = [...cart];
  let indexToUpdate = currentCart.findIndex(item => item._id === _id);
  let bookUpdate = {
    ...currentCart[indexToUpdate],
    quantity: currentCart[indexToUpdate].quantity + unit
  };
  let nextCart = [
    ...currentCart.slice(0, indexToUpdate),
    bookUpdate,
    ...currentCart.slice(indexToUpdate + 1)
  ];

  return function(dispatch) {
    axios
      .post("/api/cart", nextCart)
      .then(response =>
        dispatch({ type: types.UPDATE_CART, payload: response.data })
      )
      .catch(err =>
        dispatch({ type: types.UPDATE_CART_REJECTED, payload: err })
      );
  };

  // return {
  //   type: types.UPDATE_CART,
  //   payload: nextCart
  // };
};
