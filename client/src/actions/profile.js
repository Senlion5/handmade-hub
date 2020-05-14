import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from "./types";
import { apiUrl } from "../config.json";

const meEndpoint = apiUrl + "/profile/me";
const profileEndpoint = apiUrl + "/profile";
const userEndpoint = apiUrl + "/profile/user/";
const experienceEndpoint = apiUrl + "/profile/experience";
const educationEndpoint = apiUrl + "/profile/education";
const deleteExpEndpoint = apiUrl + "/profile/experience/";
const deleteEduEndpoint = apiUrl + "/profile/education/";

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(meEndpoint);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    //const error = err.response.data;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

//Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get(profileEndpoint);

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    //const error = err.response.data;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

//Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(userEndpoint + userId);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    //const error = err.response.data;
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(profileEndpoint, formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const error = err.response.data;
    dispatch(setAlert(error, "danger"));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(experienceEndpoint, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const error = err.response.data;
    dispatch(setAlert(error, "danger"));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(educationEndpoint, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const error = err.response.data;
    dispatch(setAlert(error, "danger"));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

//Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  //console.log(id);
  try {
    const res = await axios.delete(deleteExpEndpoint + { id });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

//Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(deleteEduEndpoint + { id });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

//Delete Account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This action can NOT be undone!")) {
    try {
      await axios.delete(profileEndpoint);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Account Deleted", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data, status: err.response.status },
      });
    }
  }
};
