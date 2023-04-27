const { createSlice } = require("@reduxjs/toolkit");
const { addPost } = require("../actions/post");

const initialState = {
  data: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    //동기적, 내부에서 사용
    clearPost(state, action) {
      state.data = [];
    },
  },
  // extraReducers: {
  //   //비동기적, 외부에서 사용
  //   [addPost.pending](state, action) {},
  //   [addPost.fulfilled](state, action) {
  //     state.data.push(action.payload)
  //   },
  //   [addPost.rejected](state, action) {},
  // },
  extraReducers: (builder) =>
    //비동기적, 외부에서 사용
    builder
      .addCase(addPost.pending, (state, action) => {})
      .addCase(addPost.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {})
      .addMatcher(
        (action) => {
          return action.type.includes("/pending");
        },
        (state, action) => {
          state.isLoading = true;
        }
      ),
});
module.exports = postSlice;
