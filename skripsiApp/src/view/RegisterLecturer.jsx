import React from 'react'
import './RegisterLecturer.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const RegisterLecturer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');

  const generateRandomNIM = () => {
    const randomNIM = Math.floor(1000 + Math.random() * 9000).toString();
    const resultNIM = 'D' + randomNIM;
    return resultNIM;
  };

  const handleRegisterLecturer = async (e) => {
    e.preventDefault();
    try {
    const lecturerData = {
    DosenID: generateRandomNIM(),
    Nama: name,
    Email: email,
    Password: password,
    Kampus: campus,
    };
    const response = await fetch('http://localhost:3000/api/users/registerLecturer', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(lecturerData),
    });
    window.location.href = "/";
    const result = await response.json();
    } catch (error) {
    console.error('Error:', error.message);
    }
    };

    useEffect(() => {
        localStorage.removeItem('email');
        }, []);

  return (
    <section id='registerLecturerPage'>
        <div class="registerLecturerContainer">
            <div class="registerLecturerContent">
                <form onSubmit={handleRegisterLecturer}>
                    <h2>Lecturer Register</h2>
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
