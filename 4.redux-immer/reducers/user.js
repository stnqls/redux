const { produce } = require("immer");

const userInitialState = {
  isLoggingIn: false,
  data: null,
};

// immer
// nextState = produce(prevState, (draft) => { })

const userReducer = (prevState = userInitialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case "LOG_IN":
        draft.data = action.data;
        break;
      case "LOG_OUT":
        draft.data = null;
        break;
      case "LOG_IN_REQUEST":
        draft.data = null;
        draft.isLoggingIn = true;
        break;
      case "LOG_IN_SUCCESS":
        draft.data = action.data;
        draft.isLoggingIn = false;
        break;
      case "LOG_IN_FAILURE":
        draft.data = null;
        draft.isLoggingIn = false;
        break;
      default:
        break;
    }
  });
};

module.exports = { userReducer, userInitialState };
