import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UpdateSidang.css'

export const UpdateSidang = () => {
    const emailLocal = localStorage.getItem('email');
    const nim = localStorage.getItem('nim');
    const [tanggalSidang, setTanggalSidang] = useState();
    const [tempatSidang, setTempatSidang] = useState();
    
    const handleUpdateSidang = async (e) => {
        e.preventDefault();
        try {
          const updateData = {
            NIM: nim,
            TanggalSidang: tanggalSidang,
            TempatSidang: tempatSidang,
            Email: emailLocal
            };
        const response = await fetch('http://localhost:3000/api/users/updateSidang', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
        });
        window.location.href = "/homeStaff";
        const result = await response.json();
        } catch (error) {
        console.error('Error:', error.message);
        }
      };

    useEffect(() => {
    const emailLocal = localStorage.getItem('email');
    if (emailLocal == null || emailLocal == ''){
        window.location.href = "/";
    }}, []);

  return (
    <div className="container">
        <div className='updateSidangPage'>
            <form onSubmit={handleUpdateSidang}>
                <h2>Update Data Sidang</h2>
                <div className="updateDataInput">
                    <label htmlFor="name">Tanggal Sidang</label>
                    <input
                    type="date"
                    value={tanggalSidang}
                    onChange={(e) => setTanggalSidang(e.target.value)}
                    required />
                </div>
                <div className="updateDataInput">
                    <label htmlFor="email">Tempat Sidang</label>
                    <input
                    type="text"
                    value={tempatSidang}
                    onChange={(e) => setTempatSidang(e.target.value)}
                    required />
                </div>
                <button type='submit'>Update</button>
            </form>
        </div>
    </div>
  )
}
