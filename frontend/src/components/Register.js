import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        error: ''
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = this.state;

        try {
            const response = await axios.post('https://claw-enterprises-backend-tg40.onrender.com/register', { username, email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('User registered:', response.data);
            if (response.status === 201) {
                alert('User registered successfully!');
                this.props.history.push('/login');
            } else {
                this.setState({ error: 'Error Registering User' });
            }
        } catch (error) {
            console.error('Error registering user:', error.response ? error.response.data : error.message);
            this.setState({ error: 'Error Registering User' });
        }
    };

    render() {
        return (
            <div className="register-container">
                <div className="register-header">
                    <h2>Register</h2>
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </div>
                <form className='register-form-container' onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                        className="input-field"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                        className="input-field"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                        className="input-field"
                    />
                    <button type="submit" className="submit-button">Register</button>
                </form>
                {this.state.error && <p className="error">{this.state.error}</p>}
            </div>
        );
    }
}

export default withRouter(Register);
