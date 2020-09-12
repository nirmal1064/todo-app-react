import React, { Component } from "react";
import TodoService from "../services/TodoService";
import { Link } from "react-router-dom";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTodos = this.retrieveTodos.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTodo = this.setActiveTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.removeAllTodos = this.removeAllTodos.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.updateStatus = this.updateStatus.bind(this);

        this.state = {
            todos: [],
            currentTodo: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveTodos();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveTodos() {
        TodoService.getAll().then(response => {
            this.setState({
                todos: response.data
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    refreshList() {
        this.retrieveTodos();
        this.setState({
            currentTodo: null,
            currentIndex: -1
        });
    }

    setActiveTodo(todo, index) {
        this.setState({
            currentTodo: todo,
            currentIndex: index
        });
    }

    updateStatus() {
        const data = {
            ...this.state.currentTodo,
            completed: !this.state.currentTodo.completed
        };
        TodoService.update(this.state.currentTodo.id, data).then(response => {
            this.setState(prevState => ({
                currentTodo: {
                    ...prevState.currentTodo,
                    completed: !prevState.currentTodo.completed
                }
            }));
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    removeTodo() {
        const id = this.state.currentTodo.id;
        TodoService.delete(id).then(response => {
            console.log(response.data);
            this.refreshList();
        }).catch(err => {
            console.log(err);
        });
    }

    removeAllTodos() {
        TodoService.deleteAll().then(response => {
            console.log(response.data);
            this.refreshList();
        }).catch(err => {
            console.log(err);
        });
    }

    searchTitle() {
        TodoService.findByTitle(this.state.searchTitle).then(response => {
            this.setState({
                todos: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        const { searchTitle, todos, currentTodo, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                            Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Todos List</h4>

                    <ul className="list-group">
                        {todos &&
                        todos.map((todo, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveTodo(todo, index)}
                                key={index}
                            >
                                {todo.title}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllTodos}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentTodo ? (
                        <div>
                            <h4>Todo</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentTodo.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentTodo.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentTodo.completed ? "Completed" : "Pending"}
                            </div>

                            <Link
                                to={"/todos/" + currentTodo.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>{" "}
                            <Link
                                className="badge badge-danger"
                                onClick={this.removeTodo}
                            >
                            Delete
                            </Link>{" "}
                            {currentTodo.completed ? (
                                <Link
                                    className="badge badge-primary mr-2"
                                    onClick={this.updateStatus}
                                >
                                    Incomplete
                                </Link>
                            ) : (
                                <Link
                                    className="badge badge-primary mr-2"
                                    onClick={this.updateStatus}
                                >
                                    Complete
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Todo...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default TodoList;