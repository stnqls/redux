import { createStore, compose, applyMiddleware } from "redux";
const { composeWithDevTools } = require("redux-devtools-extension");
import reducer from "./reducers";

const initialState = {
  user: {
    isLoggingIn: false,
    data: null,
  },
  posts: [],
};

const firstMiddleware = (store) => (dispatch) => (action) => {
  console.log("로깅", action);
  dispatch(action);
};

const thunkMiddleware = (store) => (dispatch) => (action) => {
  //비동기
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  //동기
  return dispatch(action);
};

//순서대로 진행
// const enhancer = applyMiddleware(firstMiddleware, thunkMiddleware);

// redux devTools 사용하기
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(firstMiddleware, thunkMiddleware))
    : composeWithDevTools(applyMiddleware(firstMiddleware, thunkMiddleware));

const store = createStore(reducer, initialState, enhancer);

export default store;
