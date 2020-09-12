import React, { Component } from "react";
import {Switch, Route, Link} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import TodoComponent from "./components/TodoComponent";

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/todos" className="navbar-brand">
                        TODO APP
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/todos"} className="nav-link">Todos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">Add Todo</Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/todos"]} component={TodoList} />
                        <Route exact path="/add" component={AddTodo} />
                        <Route path="/todos/:id" component={TodoComponent} />
                    </Switch>
                </div>
            </div>
        );
    }
}
export default App;
