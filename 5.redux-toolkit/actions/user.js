const { createAsyncThunk } = require("@reduxjs/toolkit");

const delay = (time, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

const logIn = createAsyncThunk("user/logIn", async (data, thunkAPI) => {
  //비동기 요청을 처리한다. (pending,fulfilled,rejected)
  // const state = thunkAPI.getState(); 이렇게 사용가능하다.
  console.log(data);
  // throw new Error("비밀번호가 틀렸습니다.")
  const result = await delay(500, {
    userId: 1,
    nickname: "zerocho",
  });
  return result;
});

module.exports = { logIn };
