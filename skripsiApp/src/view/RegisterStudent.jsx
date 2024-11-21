import React from 'react'
import './RegisterStudent.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const RegisterStudent = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [campus, setCampus] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [religion, setReligion] = useState('');
    const [major, setMajor] = useState('');

    const generateRandomNIM = () => {
        const randomNIM = Math.floor(100000 + Math.random() * 900000).toString();
        const resultNIM = '2602' + randomNIM;
        return resultNIM;
      };

    const handleRegisterStudent = async (e) => {
    e.preventDefault();
    try {
    const studentData = {
        NIM: generateRandomNIM(),
        Nama: name,
        Email: email,
        Password: password,
        Kampus: campus,
        DOB: dob,
        Gender: gender,
        Alamat: address,
        Agama: religion,
        Jurusan: major,
    };
    const response = await fetch('http://localhost:3000/api/users/registerStudent', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
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
    <section id='registerStudentPage'>
        <div class="registerStudentContainer">
            <div class="registerStudentContent">
                <form onSubmit={handleRegisterStudent}>
                    <h2>Student Register</h2>
                    <div className="registerStudentForms">
                        <div className="registerStudentLeft">
                            <div className="registerStudentInput">
                                <input type="text" value={name} onChange={(e)=> setName(e.target.value)}
                                required
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="registerStudentInput">
                                <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}
                                required
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="registerStudentInput">
                                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}
                                required
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="registerStudentInput">
                                <input type="password" value={confirmPassword} onChange={(e)=>
                                setConfirmPassword(e.target.value)}
                                required
                                />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                            <div className="registerStudentInput">
                                <input type="text" value={campus} onChange={(e)=> setCampus(e.target.value)}
                                required
                                />
                                <label htmlFor="campus">Campus</label>
                            </div>
                        </div>
                        <div className="registerStudentRight">
                            <div className="registerStudentInput">
                                <input type="date" value={dob} onChange={(e)=> setDob(e.target.value)}
                                required
                                />
                                <label htmlFor="dateOfBirth">Date of Birth</label>
                            </div>
                            <div className="registerStudentInput">
                                <input type="text" value={gender} onChange={(e)=> setGender(e.target.value)}
                                required
                                />
                                <label htmlFor="gender">Gender</label>
                            </div>
                            <div className="registerStudentInput">
                                <input type="text" value={address} onChange={(e)=> setAddress(e.target.value)}
                                required
                                />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="registerStudentInput">
                                <input type="text" value={religion} onChange={(e)=> setReligion(e.target.value)}
                                required
                                />
                                <label htmlFor="religion">Religion</label>
                            </div>
                            <div className="registerStudentInput">
                                <input type="text" value={major} onChange={(e)=> setMajor(e.target.value)}
                                required
                                />
                                <label htmlFor="major">Major</label>
                            </div>
                        </div>
                    </div>
                    <button type='submit'>Register</button>
                    <div class="register">
                        <p>Wrong Role?
                            <Link to="/register">Back to Register Page</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </section>
    )
    }
