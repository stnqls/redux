import logo from "./logo.svg";
import "./App.css";
// import { addTodo } from "./redux/actions";
// import useReduxState from "./hooks/useReduxState";
// import useReduxDispatch from "./hooks/useReduxDispatch";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  // const state = useReduxState();
  // const dispatch = useReduxDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* {JSON.stringify(state)} */}
        <TodoList />
        <TodoForm />
        {/* <button onClick={click}>추가</button> */}
      </header>
    </div>
  );

  // function click() {
  //   dispatch(addTodo("todo"));
  // }
}

export default App;
