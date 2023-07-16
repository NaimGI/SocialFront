import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, navigator) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
      console.log(data);
    dispatch({ type: AUTH, data });
    navigator("/posts")
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigator) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    navigator("/posts");
  } catch (error) {
    console.log(error);
  }
};