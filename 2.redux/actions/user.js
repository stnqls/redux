//비동기 action 생성자
const asyncLogIn = (data) => {
  // async action
  return (dispatch, getState) => {
    dispatch(logInRequest(data));
    try {
      setTimeout(() => {
        dispatch(
          logInSuccess({
            userId: 1,
            nickname: "zerocho",
          })
        );
      }, 2000);
    } catch (e) {
      dispatch(logInFailure(e));
    }
  };
};

const logInRequest = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};

const logInSuccess = (data) => {
  return {
    type: "LOG_IN_SUCCESS",
    data,
  };
};

const logInFailure = (err) => {
  return {
    type: "LOG_IN_FAILURE",
    err,
  };
};

//actoin 생성자
const logIn = (data) => {
  //action
  return {
    type: "LOG_IN",
    data,
  };
};

const logOut = () => {
  //action
  return {
    type: "LOG_OUT",
  };
};

module.export = { logIn, logOut };
