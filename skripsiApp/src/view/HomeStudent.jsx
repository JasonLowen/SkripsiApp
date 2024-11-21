import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './HomeStudent.css'

export const HomeStudent = () => {

  const emailLocal = localStorage.getItem('email');
  const [email, setEmail] = useState(emailLocal);
  const [thesisExist, setThesisExist] = useState();
  const [skripsi, setSkripsi] = useState();
  const checkStudentThesis = async () => {
    try {
      const studentData = {
        Email: email,
        };
    const response = await fetch('http://localhost:3000/api/users/checkStudentThesis', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
    });
    const result = await response.json();
  if (result.thesisExists == false){
    window.location.href = "/applySkripsi";
  }
  else{
    setThesisExist(result.thesisExists);
    setSkripsi(result.data);
  }
    } catch (error) {
    console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    const emailLocal = localStorage.getItem('email');
    if (emailLocal == null || emailLocal == ''){
      window.location.href = "/";
    }
      checkStudentThesis();
    }, []);

  return (
    <div className="homeStudentPage">
      <div className="emailAccountStudent">
        {email}
      </div>
      <Link to="/" className="logoutButton">Log Out</Link>
      <div className="dashboardContainer">
        <h1>Dashboard Student</h1>
        {skripsi && (
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
          </>
        )}
      </div>
    </div>
  )
}