import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

class Login extends Component {
    state = {
        email: '',
        password: '',
        error: ''
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        try {
            const response = await axios.post('https://claw-enterprises-backend-tg40.onrender.com/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('User logged in:', response.data);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                this.props.history.push('/todos');
            } else {
                this.setState({ error: 'Invalid Credentials' });
            }
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
            this.setState({ error: 'Invalid Credentials' });
        }
    };

    render() {
        return (
            <div className="login-container">
                <div className="login-header">
                    <h2>Log in</h2>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
                <form className='login-form-container' onSubmit={this.handleSubmit}>
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
                    <button type="submit" className="submit-button">Log in</button>
                </form>
                {this.state.error && <p className="error">{this.state.error}</p>}
            </div>
        );
    }
}

export default withRouter(Login);
