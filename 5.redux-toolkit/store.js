const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
import reducer from "./reducers";

const firstMiddleware = (store) => (dispatch) => (action) => {
  console.log("로깅", action);
  dispatch(action);
};

const store = configureStore({
  reducer,
  // middleware: [firstMiddleware] => 내장되어있는 thunk는 제외된다.
  middleware: [firstMiddleware, ...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== "production",
});

// module.exports = store;
export default store;
