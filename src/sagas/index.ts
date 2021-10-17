import { takeEvery } from '@redux-saga/core/effects'
import { GET_PRODUCTS_REQUEST } from './../actions/products';
import productsSaga from './productsSaga';


export function* sagaWatcher() {    // функция генератор
  yield takeEvery(GET_PRODUCTS_REQUEST, productsSaga);   //  
};