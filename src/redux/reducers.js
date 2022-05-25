import { ADD_TODO } from "./actions";

// state 모습 : ['코딩','점심먹기'];

const initialState = [];

export function todoApp(previousState = initialState, action) {
  //초기값 설정
  // if (previousState === undefined) {
  //   return [];
  // }
  //
  if (action.type === ADD_TODO) {
    return [...previousState, action.todo];
  }

  return previousState;
}
