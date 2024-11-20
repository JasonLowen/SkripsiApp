import React from 'react'
import './RegisterLecturer.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const RegisterStaff = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');

  const handleRegisterStaff = async (e) => {
    e.preventDefault();
    try {
    const staffData = {
    StaffID: '123456',
    Nama: name,
    Email: email,
    Password: password,
    Kampus: campus,
    };
    const response = await fetch('http://localhost:3000/api/users/registerStaff', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(staffData),
    });
    const result = await response.json();
    } catch (error) {
    console.error('Error:', error.message);
    }
    };

  return (
    <section id='registerLecturerPage'>
        <div class="registerLecturerContainer">
            <div class="registerLecturerContent">
                <form onSubmit={handleRegisterStaff}>
                    <h2>Staff Register</h2>
                    <div className="registerLecturerInput">
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="registerLecturerInput">
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="registerLecturerInput">
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="registerLecturerInput">
                    <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <div className="registerLecturerInput">
                    <input
                    type="text"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    required
                    />
                    <label htmlFor="campus">Campus</label>
                </div>
                    <button type='submit'>Register</button>
                    <div class="register">
                        <p>Wrong Role? <Link to="/register">Back to Register Page</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}