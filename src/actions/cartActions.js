import * as types from "../constants/types";

export const addToCart = book => {
  return {
    type: types.ADD_TO_CART,
    payload: book
  };
};

export const deleteCartItem = cart => {
  return {
    type: types.DELETE_CART_ITEM,
    payload: cart
  };
};

export const updateCart = (_id, unit) => {
  return {
    type: types.UPDATE_CART,
    _id,
    unit
  }
}