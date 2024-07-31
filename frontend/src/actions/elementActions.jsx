import axios from "axios";

import {
  ALL_ELEMENTS_REQUEST,
  ALL_ELEMENTS_SUCCESS,
  ALL_ELEMENTS_FAIL,
  ELEMENT_DETAILS_REQUEST,
  ELEMENT_DETAILS_SUCCESS,
  ELEMENT_DETAILS_FAIL,
  NEW_ELEMENT_REQUEST,
  NEW_ELEMENT_SUCCESS,
  NEW_ELEMENT_FAIL,
  DELETE_ELEMENT_REQUEST,
  DELETE_ELEMENT_SUCCESS,
  DELETE_ELEMENT_FAIL,
  UPDATE_ELEMENT_REQUEST,
  UPDATE_ELEMENT_SUCCESS,
  UPDATE_ELEMENT_FAIL,
  CLEAR_ERRORS,
} from "../constants/elementConstants";

export const getElementDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ELEMENT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_API}/api/v1/element/${id}`
    );
    dispatch({
      type: ELEMENT_DETAILS_SUCCESS,
      payload: data.element,
    });
  } catch (error) {
    dispatch({
      type: ELEMENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getElements = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ELEMENTS_REQUEST });
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_API}/api/v1/elements`,
      {
        withCredentials: true, 
      }
    );
    dispatch({
      type: ALL_ELEMENTS_SUCCESS,
      payload: data.elements,
    });
  } catch (error) {
    dispatch({
      type: ALL_ELEMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newElement = (elementData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ELEMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API}/api/v1/element/new`,
      elementData,
      config
    );
    dispatch({
      type: NEW_ELEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ELEMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteElement = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ELEMENT_REQUEST });
    const { data } = await axios.delete(
      `${import.meta.env.VITE_APP_API}/api/v1/element/${id}`,
      {
        withCredentials: true, 
      }
    );
    dispatch({
      type: DELETE_ELEMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ELEMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateElement = (id, elementData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ELEMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_APP_API}/api/v1/element/${id}`,
      elementData,
      config
    );
    dispatch({
      type: UPDATE_ELEMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ELEMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
