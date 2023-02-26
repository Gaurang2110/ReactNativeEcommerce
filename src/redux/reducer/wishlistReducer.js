import {ADD_TO_WISHLIST, REMOVE_TO_WISHLIST} from '../action.js/home';

export default function wishlistReducer(initalState = [], action) {
  const {payload, type} = action;
  switch (type) {
    case ADD_TO_WISHLIST:
      return [...initalState, payload];

    case REMOVE_TO_WISHLIST:
      const removeFav = initalState.filter((item, index) => {
        return index != payload;
      });

      return removeFav;

    default:
      return initalState;
  }
}
