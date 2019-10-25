import { LOGIN_SUCCESS, SIGNUP_SUCCESS } from "./actions";

export const saveAuthToken = store => next => action => {
  if (action.type === LOGIN_SUCCESS || action.type === SIGNUP_SUCCESS) {
    // save token
    console.log(action.payload.token);
  }
  next(action);
};
