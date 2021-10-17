import {call, put} from "@redux-saga/core/effects"
import { PRODUCTS_ENDPOINT } from '../constants/endpoints';
import { getRequest } from './../utils/index';
import { getProductsFailActions, getProductsResponsActions } from './../actions/products';

function* productsSaga(action: any) {
  try {
    //@ts-ignore
    const respons = yield call(getProducts, action.payload)
    yield put(getProductsResponsActions(respons.data))
  } catch (error) {
    yield put(getProductsFailActions())
  }
}

async function getProducts(pageInfo: any) {
  const query = pageInfo ? `?page=${pageInfo?.pageIndex}&limit=${pageInfo?.pageSize}` : '';
  const respons = await getRequest(`${PRODUCTS_ENDPOINT}${query}`)
  return respons;
}


export default productsSaga;