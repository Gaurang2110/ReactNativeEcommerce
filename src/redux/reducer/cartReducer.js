import {ADD_TO_CART, DELETE_TO_CART, REMOVE_TO_CART} from '../action.js/home';

export default function cartReducer(initalState = [], action) {
  const {payload, type} = action;

  switch (type) {
    case ADD_TO_CART: {
      let index = -1;
      initalState.map((item, id) => {
        if (item.id == payload.id) {
          index = id;
        }
      });
      if (index == -1) {
        initalState.push({
          id: payload.id,
          productImg: payload.productImg,
          productName: payload.productName,
          productPrice: payload.productPrice,
          perkg: payload.perkg,
          minWeight: payload.minWeight,
          soldBy: payload.soldBy,
          stock: payload.stock,
          categories: payload.categories,
          qty: payload.qty + 1,
          desc: payload.desc,
        });
      } else {
        console.log('qty increse called', index, initalState[index].qty);
        initalState[index].qty = initalState[index].qty + 1;
      }
    }

    case REMOVE_TO_CART: {
      let index = -1;
      initalState.map((item, id) => {
        if (item.id == payload.id) {
          index = id;
        }
      });
      if (index == -1) {
      } else {
        initalState[index].qty = initalState[index].qty - 1;
      }
    }

    case DELETE_TO_CART:
      const removeItem = initalState.filter((item, index) => {
        return index != payload;
      });

      return removeItem;
    default:
      return initalState;
  }
}
