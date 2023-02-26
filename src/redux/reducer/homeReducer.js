const {
  ADD_TO_CART,
  REMOVE_TO_CART,
  ADD_TO_WISHLIST,
  REMOVE_TO_WISHLIST,
  ALL_PRODUCT,
  INCRESE_QTY,
  DECREASE_QTY,
} = require('../action.js/home');

const HomeReducer = (initalState = [], actions) => {
  const {payload, type} = actions;

  switch (type) {
    case ALL_PRODUCT:
      return [...initalState, payload];

    case INCRESE_QTY: {
      let index = -1;
      initalState.map((item, id) => {
        if (item.id == payload) {
          index = id;
        }
      });
      if (index == -1) {
      } else {
        initalState[index].qty = initalState[index].qty + 1;
      }
    }

    case DECREASE_QTY: {
      let index = -1;
      initalState.map((item, id) => {
        if (item.id == payload) {
          index = id;
        }
      });
      if (index == -1) {
      } else {
        initalState[index].qty = initalState[index].qty - 1;
      }
    }

    default:
      return initalState;
  }
};

export default HomeReducer;
