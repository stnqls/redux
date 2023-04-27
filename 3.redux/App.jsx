import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
const { asyncLogIn, logOut } = require("./actions/user");

const App = () => {
  const user = useSelector((state) => state.user);
  // const posts = useSelector((state) => {
  //   state.posts;
  // });
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(
      asyncLogIn({
        id: "zerocho",
        password: 1234,
      })
    );
  }, []);

  const onLogout = useCallback(() => {
    dispatch(logOut());
  }, []);

  return (
    <div>
      {user.isLoggingIn ? (
        <div>로그인중</div>
      ) : user.data ? (
        <div>user nickname: {user.data.nickname}</div>
      ) : (
        "로그인해주세요"
      )}
      {!user.data ? (
        <button onClick={onClick}>로그인</button>
      ) : (
        <button onClick={onLogout}>로그아웃</button>
      )}
    </div>
  );
};

export default App;
