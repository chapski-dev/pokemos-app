import { combineReducers } from "redux";
import productsReducer from './productsReducer';


export const reducer = combineReducers({
  products: productsReducer,
});