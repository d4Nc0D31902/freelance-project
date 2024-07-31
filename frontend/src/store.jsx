import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import { thunk } from "redux-thunk";

//* USERS *//
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
  customerSalesReducer,
} from "./reducers/userReducers";

import {
  elementDetailsReducer,
  elementReducer,
  elementsReducer,
  newElementReducer,
} from "./reducers/elementReducers";

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  customerSales: customerSalesReducer,
  elementDetails: elementDetailsReducer,
  element: elementReducer,
  elements: elementsReducer,
  newElement: newElementReducer,
});

let initialState = {};

const middlware = [thunk];
const store = createStore(reducer, initialState, applyMiddleware(...middlware));

export default store;
