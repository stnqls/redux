import { connect } from "react-redux";

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, idx) => {
        return <li key={`todo-list-${idx}`}>{todo.text}</li>;
      })}
    </ul>
  );
}
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListContainer;
