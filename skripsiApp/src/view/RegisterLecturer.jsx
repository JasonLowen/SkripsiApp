import React from 'react'
import './RegisterLecturer.css'
import { Link } from 'react-router-dom'

export const RegisterLecturer = () => {
  return (
    <section id='registerLecturerPage'>
        <div class="registerLecturerContainer">
            <div class="registerLecturerContent">
                <form action="">
                    <h2>Lecturer Register</h2>
                    <div class="registerLecturerInput">
                        <input type="text" required />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div class="registerLecturerInput">
                        <input type="email" required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div class="registerLecturerInput">
                        <input type="password" required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div class="registerLecturerInput">
                        <input type="password" required />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                    <div class="registerLecturerInput">
                        <input type="text" required />
                        <label htmlFor="campus">Campus</label>
                    </div>
                    <button>Register</button>
                    <div class="register">
                        <p>Wrong Role? <Link to="/register">Back to Register Page</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}
