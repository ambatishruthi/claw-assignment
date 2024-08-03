import React, { Component } from 'react';
import axios from 'axios';
import './TodoList.css';

class TodoList extends Component {
    state = {
        todos: [],
        newTodo: '',
        editingTodoId: null,
        editingTodoText: '',
        error: ''
    };

    componentDidMount() {
        this.fetchTodos();
    }

    fetchTodos = async () => {
        try {
            const response = await axios.get('https://claw-enterprises-backend-tg40.onrender.com/todos', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            this.setState({ todos: response.data });
        } catch (error) {
            console.error('Error fetching todos:', error.response ? error.response.data : error.message);
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { newTodo } = this.state;
        try {
            await axios.post('https://claw-enterprises-backend-tg40.onrender.com/todos', { todo: newTodo }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            this.setState({ newTodo: '' });
            this.fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error.response ? error.response.data : error.message);
        }
    };

    handleDelete = async (id) => {
        try {
            await axios.delete(`https://claw-enterprises-backend-tg40.onrender.com/todos/${id}`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            this.fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error.response ? error.response.data : error.message);
        }
    };

    handleEditClick = (todo) => {
        this.setState({ editingTodoId: todo._id, editingTodoText: todo.todo });
    };

    handleEditChange = (e) => {
        this.setState({ editingTodoText: e.target.value });
    };

    handleEditSubmit = async (e) => {
        e.preventDefault();
        const { editingTodoId, editingTodoText } = this.state;
        try {
            await axios.put(`https://claw-enterprises-backend-tg40.onrender.com/todos/${editingTodoId}`, { todo: editingTodoText }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            this.setState({ editingTodoId: null, editingTodoText: '' });
            this.fetchTodos();
        } catch (error) {
            console.error('Error editing todo:', error.response ? error.response.data : error.message);
        }
    };

    render() {
        const { todos, newTodo, editingTodoId, editingTodoText } = this.state;

        return (
            <div className="todo-list-container">
                <h2>My To-Do List</h2>
                <form className='todo-form-container' onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="newTodo"
                        value={newTodo}
                        onChange={this.handleChange}
                        placeholder="Enter a new to-do"
                        required
                        className="input-field"
                    />
                    <button type="submit" className="add-button">Add</button>
                </form>
                <ul>
                    {todos.map(todo => (
                        <li key={todo._id}>
                            {editingTodoId === todo._id ? (
                                <form onSubmit={this.handleEditSubmit}>
                                    <input
                                        type="text"
                                        value={editingTodoText}
                                        onChange={this.handleEditChange}
                                        required
                                        className="todo-input"
                                    />
                                    <button type="submit" className="save-button">Save</button>
                                </form>
                            ) : (
                                <>
                                    {todo.todo}
                                    <div>
                                        <button onClick={() => this.handleEditClick(todo)} className="edit-button">Edit</button>
                                        <button onClick={() => this.handleDelete(todo._id)} className="delete-button">Delete</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoList;
