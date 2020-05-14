import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOGEDIN,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { apiUrl } from "../config.json";

const registerEndpoint = apiUrl + "/users";
const authEndpoint = apiUrl + "/auth";

// User Logedin
export const loginUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  try {
    const res = await axios.get(authEndpoint);

    dispatch({
      type: USER_LOGEDIN,
      token: res.headers["x-auth-token"],
      payload: res.data,
    });

    //dispatch(loginUser()) - turns on an infinite loop of login;
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const body = JSON.stringify({ name, email, password });

  try {
    const config = {
      headers: {
        json: true,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(registerEndpoint, body, config);
    //console.log(res.data);
    //console.log(res.headers["x-auth-token"]);

    setAuthToken(res.headers["x-auth-token"]);

    dispatch({
      type: REGISTER_SUCCESS,
      token: res.headers["x-auth-token"],
      payload: res.data,
      //payload: res.headers["x-auth-token"]
    });

    //dispatch(loginUser());
  } catch (err) {
    const error = err.response.data;
    dispatch(setAlert(error, "danger"));

    dispatch({
      type: REGISTER_FAIL,
      payload: error,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });

  try {
    const config = {
      headers: {
        json: true,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(authEndpoint, body, config);

    setAuthToken(res.headers["x-auth-token"]);

    dispatch({
      type: LOGIN_SUCCESS,
      token: res.headers["x-auth-token"],
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data;
    dispatch(setAlert(error, "danger"));

    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
