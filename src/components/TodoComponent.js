import React, { Component } from 'react'
import TodoService from '../services/TodoService'

class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getTodo = this.getTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.state = {
            currentTodo: {
                id: null,
                title: "",
                description: "",
                completed: false
            },
            message: ""
        }
    }

    componentDidMount() {
        this.getTodo(this.props.match.params.id);
    }

    onChangeTitle(evt) {
        const title = evt.target.value;
        this.setState((prevState) => {
            return {
                currentTodo: {
                    ...prevState.currentTodo,
                    title: title
                }
            };
        });
    }

    onChangeDescription(evt) {
        const description = evt.target.value;

        this.setState(prevState => ({
            currentTodo: {
                ...prevState.currentTodo,
                description: description
            }
        }));
    }

    getTodo(id) {
        TodoService.get(id).then(response => {
            this.setState({
                currentTodo: response.data
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    updateTodo() {
        TodoService.update(
            this.state.currentTodo.id,
            this.state.currentTodo
        ).then(response => {
            this.setState({
                message: "The Todo was updated successfully!"
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    render(){
        const { currentTodo } = this.state;

        return (
            <div>
                {currentTodo ? (
                    <div className="edit-form">
                        <h4>Todo</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentTodo.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentTodo.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentTodo.completed ? "Completed" : "Pending"}
                            </div>
                        </form>

                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.updateTodo}
                        >
                        Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Todo...</p>
                    </div>
                )}
            </div>
        )
    }
}

export default TodoComponent;