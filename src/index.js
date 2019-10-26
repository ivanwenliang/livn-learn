import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Modal from "react-modal";
import App from "./App";
import reducer from "./reducers";
import { loadCourses, loadLastUser } from "./actions";
import "./index.css";
import { saveAuthToken } from "./middleware";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, saveAuthToken));

const store = createStore(reducer, enhancer);

// Load the courses already in db
store.dispatch(loadCourses());

// Load logged in user if in localStorage
store.dispatch(loadLastUser());

Modal.setAppElement("#root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
