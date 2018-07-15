import React, { Component } from "react";
import ShowTodos from "./components/ShowTodos";
import AddTodo from "./components/AddTodo";
import axios from "axios";

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todo: "",
      todos: []
    };
  }

  componentDidMount() {
    this.refresh();
  }

  clearInput = () => {
    this.setState({ todo: "" });
  };

  refresh = () => {
    axios.get("/todos").then(res => {
      this.setState({ todos: res.data.todos });
    })
    .catch((err) => {
      this.setState({ todos: [err.message] })
    });
  };

  addTodo = () => {
    axios
      .post(`/todos/${this.state.todo}`)
      .then(this.refresh)
    this.clearInput();
  };

  removeTodo = index => {
    axios
      .delete(`/todos/${index}`)
      .then(this.refresh)
    // const nextTodos = Array.from(this.state.todos);
    // nextTodos.splice(index, 1);
    // this.setState({ todos: nextTodos });
  };

  handleChange = e => {
    this.setState({
      todo: e.target.value
    });
  };

  render() {
    return (
      <div>
        <AddTodo
          handleChange={this.handleChange}
          addTodo={this.addTodo}
          todo={this.state.todo}
        />
        <ShowTodos todos={this.state.todos} removeTodo={this.removeTodo} />
      </div>
    );
  }
}

export default TodoApp;
