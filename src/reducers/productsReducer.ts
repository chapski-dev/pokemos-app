
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_FAIL, GET_PRODUCTS_RESPONS } from './../actions/products';

const initialState = {
  request: {
    status: '',
    errorText: '',
  },
  data: [],
}

const productsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return Object.assign({}, state, {
        request: {
          status: 'pending',
        },
      });
    case GET_PRODUCTS_RESPONS:
      return Object.assign({}, state, {
        request: {
          status: 'succsess',
        },
        data: action.payload,
      });
    case GET_PRODUCTS_FAIL:
      return Object.assign({}, state, {
        request: {
          status: 'error',
          errorText: 'something went wrong'
        },
      });
    default: 
      return state;
  }
};

export default productsReducer;