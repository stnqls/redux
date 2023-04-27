# 1.Redux

컴포넌트간 state를 관리한다.
단방향 : action을 정의해 dispatch를 발생시켜 reducer가 redux의 state가 변경됨
store.dispatch()를통해 액션 발생, 리듀서가 액션타입에 을 검사해서 상태를 변경

- `store` : createStore(reducer, initialState, enhancer) 상태 저장소
- `reducer` : action과 상태를 받아와 action의 type을 검사해서 새로운 state를 만들어준다.
- `action` : 객체
- `dispatch` : action을 발생시킨다.
- `subscribe` : 보통 react-redux안에 들어가있다. action이 dispatched되었을때 불리며, 상태변화가 일어났을때도 동작한다. 화면을 바꿔주는 코드를 작성한다.

# 2.React-redux

- `combineReducers` : 여러개의 reducer를 작성할때 관련있는것끼리 분리한 Reducer를 합치기위해서 사용한다.

  module.exports = combineReducers({user:userReducer, posts:postReducer})

redux middleware : dispatch와 reducer사이에 위치한다.

- `applyMiddleware` : 여러 middleware를 사용하기위해 사용한다.

redux- thunk : 비동기를 제어하기 위해 사용된다.

- `thunkMiddleware` = (store) => (dispatch) => (action) =>{ if(typeof action === “function”){return action(store.dispatch, store.getState) } return dispatch(action) }

- `useDispatch()`: dispatch 함수를 가져와서 사용하기 위해
- `useSelector()`: 스토어의 상태값을 반환해준다. 스토어의 상태값이 변경된 경우 바뀐 스토어의 상태값을 다시가져와 리렌더링한다.

Immer : state의 불변성을 편리하게 지키기위해 사용한다.

github.com/ZeroCho/react-nodebird/blob/master/ch7/front/reducers/post.js

```js
case "LOG_IN_SUCCESS":
      return {
        ...prevState,
        isLoggingIn: false,
        data: action.data,
      };
```

위에 방식을 이렇게 사용하기 위해

```js
case "LOG_IN_SUCCESS":
        data: action.data,
```

# 3.Redux Toolkit

const store = configureStore({reducer, preloadedState:{}})

- `preloadedState` : initialState와 같다. SSR을 이용해 서버에서 initialState를 받아와서사용하는경우 사용한다.
- `middleware` : `[thunk, logger]` 저장소에 middleware 를 추가할때 사용한다. 배열에 나열된 것 외에 추가 미들웨어는 포함 되지않는다.
  `getDefaultMiddleware` : 사용자 지정 middleware와 기본 미들웨어도 추가하려는 경우에 사용한다.

- `createSlice()` : ’name’을지정해 action과 reducer를 묶어준다. => action을 따로 만들 필요가 없다.

  - reducers : 동기적, 내부에서 사용되는 reducer를 작성한다. (slice는reducers에서 작성된다.)
  - extraReducers : 비동기적으로 외부에서 사용되는 reducer를 작성한다. (actions에서 작성된다.)

    [action.pending] , [action.fulfilled] , [action.rejected]
    action의 data는 action.data가 아니라 action.payload라는 이름으로 사용한다.

  builder의 .addCase를 사용한 방법 :

  ```js
  extraReducers: () => builder.addCase(addPost.pending, (state, action) => {});
  ```

  타입스크립트 사용시 타입추론이 더 편리하다.

  .addDefaultCase .addMatcher() : 공통의 상태를 처리할때 사용한다.

- `createAsyncThunk(‘액션의 이름’, async(data, thunkAPI))` : 비동기 요청을 처리한다. (pending, fulfilled, rejected)
  async await를 사용하지만, tyr-catch문을 사용하지 않는다. try-catch를 사용할경우 Thunk에서 오류를 감지하지 못한다.

- `createSelector` : useMemo대신 (useMemo는 저장된값의 변화를 확인하기 위한 작업을한다. ) createSelector로 사용한다. 재사용 불가능. 사용할경우, 함수로 한번 더 감싸서 사용해야한다.

# 4.Redux를 사용하지 말아야할 때

1. input : 입력할때마다 작동된다. 사용해야할 경우, form 의 submit또는 input태그의 blur를 사용한다. state로 관리
2. 비동기 : 한 컴포넌트 안에서만 비동기 작업이 사용될때
   const [loadings, setLoadings] = useState({})

# 5.RTK Query

https://codesandbox.io/s/rtk-query-example-ntsxxn?file=/src/app/api.js:476-484

## Server Hook 사용법

./app/api의 api객체 사용하기

읽기 : `useGetCountQuery({name})`

쓰기 :` useSetCountMutation({name, value})`

## RTK Query의 특징

use~Query는 읽기전용으로 사용된다. (data, isFetching, isLoading), 자동으로 실행된다. 객체를 리턴한다.

`isLoading`은 최초 한번만 실행된다. 보통 컴포넌트를 초기화할때 사용된다.

`isFetching`은 서버와 통신할때마다 사용된다.

use~Mutation은 쓰기전용으로 사용된다. 첫번째 원소 함수로 수동으로 실행한다. 배열을 리턴한다.

promise로 응답 값을 전달한다. => 서버에서 가져온 값을 즉시 바로 사용할 수 있다. 두번째 원소의 isLoading을 사용한다.

## create RTK

endpoints에서 만들어두면 RTK에서 자동으로 훅을 만들어줘 사용할 수 있다.

auto fetching

providesTags : 태그 지정

invalidatesTags : 태그 삭제

### Redux 없이 사용하는 방법 :

`<ApiProvider/>`를 사용해서 사용한다.

### Redux와 같이 사용하는 방법 :

reducerPath - api이름 설정하기, store에 reducer에 등록해서 사용한다. , middleware에 api.meddleware를 등록해준다.

```JS
// .reducer와.meddleware는 자동으로 생성됨.
reducer:{
	[api.reducerPath]: api.reducer
}
```
