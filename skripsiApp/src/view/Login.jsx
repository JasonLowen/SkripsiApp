import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <section id='loginPage'>
        <div class="loginContainer">
            <div class="loginContent">
                <form action="">
                    <h2>Login</h2>
                    <div class="loginInput">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div class="loginInput">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button>Log in</button>
                    <div class="register">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}
