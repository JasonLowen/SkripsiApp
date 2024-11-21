import React, { useEffect } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const loginData = {
            Email: email,
            Password: password,
        };
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const result = await response.json();
      if(response.status == 200){
        localStorage.setItem('email', email);
        if(result == "Student"){
            window.location.href = "/homeStudent";
        }
        else if(result == "Lecturer"){
            window.location.href = "/homeLecturer";
        }
        else if(result == "Staff"){
            window.location.href = "/homeStaff";
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    localStorage.removeItem('email');
    }, []);

  return (
    <section id='loginPage'>
        <div class="loginContainer">
            <div class="loginContent">
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div class="loginInput">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div class="loginInput">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type='submit'>Log in</button>
                    <div class="register">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}
