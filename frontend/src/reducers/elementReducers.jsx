import {
  ALL_ELEMENTS_REQUEST,
  ALL_ELEMENTS_SUCCESS,
  ALL_ELEMENTS_FAIL,
  ELEMENT_DETAILS_REQUEST,
  ELEMENT_DETAILS_SUCCESS,
  ELEMENT_DETAILS_FAIL,
  NEW_ELEMENT_REQUEST,
  NEW_ELEMENT_SUCCESS,
  NEW_ELEMENT_RESET,
  NEW_ELEMENT_FAIL,
  DELETE_ELEMENT_REQUEST,
  DELETE_ELEMENT_SUCCESS,
  DELETE_ELEMENT_RESET,
  DELETE_ELEMENT_FAIL,
  UPDATE_ELEMENT_REQUEST,
  UPDATE_ELEMENT_SUCCESS,
  UPDATE_ELEMENT_RESET,
  UPDATE_ELEMENT_FAIL,
  CLEAR_ERRORS,
} from "../constants/elementConstants";

export const elementsReducer = (state = { elements: [] }, action) => {
  switch (action.type) {
    case ALL_ELEMENTS_REQUEST:
      return {
        loading: true,
        elements: [],
      };
    case ALL_ELEMENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ALL_ELEMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        elements: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const elementDetailsReducer = (state = { element: {} }, action) => {
  switch (action.type) {
    case ELEMENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ELEMENT_DETAILS_SUCCESS:
      return {
        loading: false,
        element: action.payload,
      };
    case ELEMENT_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newElementReducer = (state = { element: {} }, action) => {
  switch (action.type) {
    case NEW_ELEMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_ELEMENT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        element: action.payload.element,
      };
    case NEW_ELEMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_ELEMENT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const elementReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ELEMENT_REQUEST:
    case UPDATE_ELEMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ELEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_ELEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_ELEMENT_FAIL:
    case UPDATE_ELEMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_ELEMENT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_ELEMENT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
