const initialState = {
  isLoggingIn: false,
  data: null,
};

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...prevState,
        data: action.data,
      };
    case "LOG_OUT":
      return {
        ...prevState,
        data: null,
      };
    case "LOG_IN_REQUEST":
      return {
        ...prevState,
        isLoggingIn: true,
        data: null,
      };
    case "LOG_IN_SUCCESS":
      return {
        ...prevState,
        isLoggingIn: false,
        data: action.data,
      };
    case "LOG_IN_FAILURE":
      return {
        ...prevState,
        isLoggingIn: false,
        data: null,
      };
    default:
      return prevState;
  }
};

module.exports = userReducer;
