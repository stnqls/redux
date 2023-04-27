import { createStore, compose, applyMiddleware } from "redux";

// const reducer = require('./reducers');
import reducer from "./reducers";
const { logIn, logOut } = require("./actions/user");
const { addPost } = require("./actions/post");

const initialState = {
  user: {
    isLoggingIn: true,
    data: null,
  },
  posts: [],
};

// const enhancer = compose(
//     applyMiddleware(),
// )

// function firstMiddleware(store) {
//     return function (next) {
//         return function (action) {

//         }
//     }
// }

const firstMiddleware = (store) => (dispatch) => (action) => {
  console.log("로깅", action);
  dispatch(action);
};

const thunkMiddleware = (store) => (dispatch) => (action) => {
  //비동기 action = 함수
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  //동기 action = 객체
  return dispatch(action);
};

//순서대로 진행
const enhancer = applyMiddleware(firstMiddleware, thunkMiddleware);

const store = createStore(reducer, initialState, enhancer);

store.subscribe(() => {
  console.log("changed");
});

console.log("1st", store.getState());
store.dispatch(
  logIn({
    id: 1,
    name: "zerocho",
    admin: true,
  })
);

console.log("2nd", store.getState());

store.dispatch(
  addPost({
    userId: 1,
    id: 1,
    content: "안녕하세요. 리덕스",
  })
);

console.log("3rd", store.getState());

store.dispatch(
  addPost({
    userId: 1,
    id: 2,
    content: "두번째 게시글입니다. 리덕스",
  })
);

console.log("4th", store.getState());

store.dispatch(logOut());

console.log("5th", store.getState());
