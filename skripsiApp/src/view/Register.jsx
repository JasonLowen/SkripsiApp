import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <section id='registerPage'>
        <div class="registerContainer">
            <div class="registerContent">
                <div className="registerTitle">
                    <h2>Register Options</h2>
                </div>
                <div className="registerOption">
                    <Link className="linkOption" to="/registerStudent">
                        <button>Student</button>
                    </Link>
                </div>
                <div className="registerOption">
                    <Link className="linkOption" to="/registerLecturer">
                        <button>Lecturer</button>
                    </Link>
                </div>
                <div className="registerOption">
                    <Link className="linkOption" to="/registerStaff">
                        <button>Staff</button>
                    </Link>
                </div>
                <Link to="/" className="backToLogin">Go back to Login</Link>
            </div>
        </div>
    </section>
  )
}

export default Register