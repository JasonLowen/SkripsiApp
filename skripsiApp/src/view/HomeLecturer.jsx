import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './HomeLecturer.css'

export const HomeLecturer = () => {
  const emailLocal = localStorage.getItem('email');
  const [email, setEmail] = useState(emailLocal);
  const [skripsi, setSkripsi] = useState();

  const checkLecturerThesis = async () => {
    try {
      const lecturerData = {
        Email: email,
        };
    const response = await fetch('http://localhost:3000/api/users/checkLecturerThesis', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(lecturerData),
    });
    const result = await response.json();
    setSkripsi(result.data);
    } catch (error) {
    console.error('Error:', error.message);
    }
  };

  const handleThesisAccept = async (command) => {
    const lecturerData = {
      Email: email,
      Command: command,
      Mahasiswa: skripsi.nim,
      };
    const response = await fetch('http://localhost:3000/api/users/handleThesisAccept', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(lecturerData),
      });
      window.location.reload();  
  }

  useEffect(() => {
    const emailLocal = localStorage.getItem('email');
    if (emailLocal == null || emailLocal == ''){
      window.location.href = "/";
    }
      checkLecturerThesis();
    }, []);

  return (
    <div className="homeLecturerPage">
      <div className="emailAccountLecturer">
        {email}
      </div>
      <Link to="/" className="logoutButton">Log Out</Link>
      <div className="dashboardContainer">
        <h1>Dashboard Lecturer</h1>
        {skripsi ? (
          <>
            <h3>Judul: {skripsi.JudulSkripsi}</h3>
            <h3>Topik: {skripsi.TopikSkripsi}</h3>
            <h3>Tipe: {skripsi.TipeSkripsi}</h3>
            <h3>Link File: {skripsi.FileSkripsi}</h3>
            <h3>Tanggal Sidang: {skripsi.TanggalSidang ? (
              <>
              {skripsi.TanggalSidang}
              </>
            ) : (
              <>
              To be Scheduled
              </>
            )}</h3>
            <h3>Tempat Sidang: {skripsi.TempatSidang ? (
              <>
              {skripsi.TempatSidang}
              </>
            ) : (
              <>
              To be Scheduled
              </>
            )}</h3>
            <h3>Dosen Pembimbing/Penguji: {skripsi.dosenID ? (
              <>
              {skripsi.dosenID}
              </>
            ) : (
              <>
              To be Accepted
              </>
            )}</h3>
            <h3>Staff: {skripsi.staffID ? (
              <>
              {skripsi.staffID}
              </>
            ) : (
              <>
              To be Scheduled
              </>
            )}</h3>
            {skripsi.StatusSkripsi == "Pending" && (
              <div className="action-buttons">
                <Link onClick={() => handleThesisAccept("Accept")} className="btn accept-btn">
                  Accept
                </Link>
                <Link onClick={() => handleThesisAccept("Decline")} className="btn decline-btn">
                  Decline
                </Link>
              </div>
            )}
          </>
        ) : (
          <>
          <h2 className='noRequest'>There are no Thesis Requests</h2>
          </>
        )}
      </div>
    </div>
  )
}
