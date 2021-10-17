export const GET_PRODUCTS_REQUEST = '@/GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_RESPONS = '@/GET_PRODUCTS_RESPONS';
export const GET_PRODUCTS_FAIL = '@/GET_PRODUCTS_FAIL';


export const getProductsRequstAction = (payload?: any) => ( { type: GET_PRODUCTS_REQUEST, payload });
export const getProductsResponsActions = (payload: any) => ({ type: GET_PRODUCTS_RESPONS, payload });
export const getProductsFailActions = () => ({ type: GET_PRODUCTS_FAIL });

// payload - данные которые вернуться по запросу на сервер (скорее всего массив [])