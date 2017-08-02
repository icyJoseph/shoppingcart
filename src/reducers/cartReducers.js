"use-strict";
import * as types from "../constants/types";

export default function cartReducers(state = { cart: [] }, action) {
  switch (action.type) {
    case types.ADD_TO_CART:
      return {
        cart: [...state, ...action.payload],
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).total // VERY BAD DESIGN OPTION, has to reload twice!
        // For big orders this would be a problem!
      };
    case types.DELETE_CART_ITEM: // For this action, the actual change is done in the component
      // there is no reason not to put it here...
      return {
        cart: [...state, ...action.payload],
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).total
      };
    case types.UPDATE_CART:
      // const currentCart = [...state.cart];
      // let indexToUpdate = currentCart.findIndex(
      //   item => item._id === action._id
      // );
      // let bookUpdate = {
      //   ...currentCart[indexToUpdate],
      //   quantity: currentCart[indexToUpdate].quantity + action.unit
      // };
      // let nextCart = [
      //   ...currentCart.slice(0, indexToUpdate),
      //   bookUpdate,
      //   ...currentCart.slice(indexToUpdate + 1)
      // ];
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).total
      };
    case types.GET_CART:
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).total
      };
    default:
      return state;
  }
}

// Calculating Totals

export function totals(payload) {
  const totalAmount = payload
    .map(cart => cart.price * cart.quantity)
    .reduce((a, b) => a + b, 0);

  const totalQty = payload
    .map(cart => cart.quantity)
    .reduce((a, b) => a + b, 0);
  return { amount: totalAmount.toFixed(2), total: totalQty };
}
