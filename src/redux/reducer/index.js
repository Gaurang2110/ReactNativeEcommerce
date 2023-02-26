import {combineReducers} from 'redux';
import HomeReducer from './homeReducer';
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';
const rootReducer = combineReducers({
  HomeReducer,
  cartReducer,
  wishlistReducer,
});

export default rootReducer;
