import { createSelector } from "@reduxjs/toolkit";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const userSlice = require("./reducers/user");
const { logIn } = require("./actions/user");
const { addPost } = require("./actions/post");

const priceSelector = (state) => state.user.prices;
const sumPriceSelector = createSelector(priceSelector, (prices) =>
  prices.reduce((a, c) => a + c, 0)
);

const App = () => {
  // user가 변경될때마다 useSelector함수가 리렌더링된다.
  const user = useSelector((state) => state.user);
  // const { email, password } = useSelector((state) => state.user);
  // const prices = useSelector((state) => state.user.prices);
  const posts = useSelector((state) => state.posts);
  const totalPrices = useSelector(sumPriceSelector);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  console.log(posts);
  // const [loadings, setLoadings] = useState({});
  // const [errors, setErrors] = useState({});
  // const [dones, setDones] = useState({});
  // const [ids, setIds]= useState([])
  // const onClick2 = useCallback(async () => {
  //   const id = new Date().valueOf(); // 고유한값을 사용한다.
  //   setLoadings((prev) => ({
  //     ...prev,
  //     [id]: { type: "LOGIN_LOADING" },
  //   }));
  //   try {
  //     const response = await axios.post("/login");
  //     setDones((prev) => ({
  //       ...prev,
  //       [id]: { type: "LOGIN_DONE" },
  //     }));
  //   } catch (error) {
  //     setErrors();
  //   }
  // });

  const onClick = useCallback(() => {
    dispatch(
      logIn({
        id: "zerocho",
        password: 1234,
      })
    );
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userSlice.actions.logOut());
  }, []);

  const onAddPost = useCallback(() => {
    dispatch(addPost());
  });

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  // const totalPrice = useMemo(() => {
  //   console.log("prices memo");
  //   return prices.reduce((a, c) => a + c, 0);
  // }, [prices]);

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
        <>
          <button onClick={onLogout}>로그아웃</button>
          <button onClick={onAddPost}>게시글 작성</button>

          {/* email을 작성할때마다 state가 변경되어 리렌더링 되면서 price가 다시 계산된다. */}
          <input type="email" value={email} onChange={onChangeEmail} />
          {/* <div>{prices.reduce((a, c) => a + c, 0)}원</div> */}
          <div>{totalPrices}원</div>
          <div>{posts.data.length > 0 && posts.data[0].title}</div>
        </>
      )}
    </div>
  );
};

export default App;
