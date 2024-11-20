import React from 'react'
import './RegisterStudent.css'
import { Link } from 'react-router-dom'

export const RegisterStudent = () => {
  return (
    <section id='registerStudentPage'>
        <div class="registerStudentContainer">
            <div class="registerStudentContent">
                <form action="">
                    <h2>Student Register</h2>
                    <div className="registerStudentForms">
                        <div className="registerStudentLeft">
                            <div class="registerStudentInput">
                                <input type="text" required />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div class="registerStudentInput">
                                <input type="email" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div class="registerStudentInput">
                                <input type="password" required />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div class="registerStudentInput">
                                <input type="password" required />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                            <div class="registerStudentInput">
                                <input type="text" required />
                                <label htmlFor="campus">Campus</label>
                            </div>
                        </div>
                        <div className="registerStudentRight">
                            <div class="registerStudentInput">
                                <input type="date" required  />
                                <label htmlFor="dateOfBirth">Date of Birth</label>
                            </div>
                            <div class="registerStudentInput">
                                <input type="text" required />
                                <label htmlFor="gender">Gender</label>
                            </div>
                            <div class="registerStudentInput">
                                <input type="text" required />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div class="registerStudentInput">
                                <input type="text" required />
                                <label htmlFor="religion">Religion</label>
                            </div>
                            <div class="registerStudentInput">
                                <input type="text" required />
                                <label htmlFor="major">Major</label>
                            </div>
                        </div>
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
