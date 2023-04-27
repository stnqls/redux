const { createSlice } = require("@reduxjs/toolkit");
const { logIn } = require("../actions/user");

const initialState = {
  isLoggingIn: false,
  data: null,
  email: "",
  password: "",
  prices: Array(100)
    .fill()
    .map((v, i) => (i + 1) * 100),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state, action) {
      state.data = null;
    },
  },
  extraReducers: {
    //로딩
    [logIn.pending](state, action) {
      //actions/user에서 지정한 이름 user/logIn/pending으로생김
      state.isLoggingIn = true;
    },
    //성공
    [logIn.fulfilled](state, action) {
      // action의 data는 무조건 payload라는 이름으로 사용한다.
      state.data = action.payload;
      state.isLoggingIn = false;
    },
    //실패
    [logIn.rejected](state, action) {
      state.data = null;
      state.isLoggingIn = false;
    },
  },
});

module.exports = userSlice;
