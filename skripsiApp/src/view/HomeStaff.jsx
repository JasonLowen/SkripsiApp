import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './HomeStaff.css'

export const HomeStaff = () => {
  const emailLocal = localStorage.getItem('email');
  const [email, setEmail] = useState(emailLocal);
  const [skripsi, setSkripsi] = useState([]);
  const [selectedSkripsi, setSelectedSkripsi] = useState([]);

  const checkStaffThesis = async () => {
    try {
      const staffData = {
        Email: email,
        };
    const response = await fetch('http://localhost:3000/api/users/checkStaffThesis', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(staffData),
    });
    const result = await response.json();
    setSkripsi(result.data);
    } catch (error) {
    console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    const emailLocal = localStorage.getItem('email');
    if (emailLocal == null || emailLocal == ''){
      window.location.href = "/";
    }
      checkStaffThesis();
    }, []);

  return (
    <div className="homeStaffPage">
      <div className="emailAccountStaff">
        {email}
      </div>
      <Link to="/" className="logoutButton">Log Out</Link>
      <div className="dashboardContainerStaff">
        <h1>Dashboard Staff</h1>
        <table>
          <tr>
            <td>NIM Mahasiswa</td>
            <td>Judul Skripsi</td>
            <td>Nama Dosen Pembimbing/Penguji</td>
            <td>Nama Staff</td>
            <td>Tanggal Sidang</td>
            <td>Tempat Sidang</td>
            <td>Status Sidang</td>
            <td>Action</td>
          </tr>
          {skripsi && (
            <>
            {skripsi.map((s, index) => (
              <>
              <tr>
                <td>{s.nim}</td>
                <td>{s.JudulSkripsi}</td>
                <td>{s.dosenID ? (
                  <>
                  {s.dosenID}
                  </>
                ) : (
                  <>-</>
                )}</td>
                <td>{s.staffID ? (
                  <>
                  {s.staffID}
                  </>
                ) : (
                  <>-</>
                )}</td>
                <td>{s.TanggalSidang ? (
                  <>{s.TanggalSidang}</>
                ) : (
                  <>-</>
                )}</td>
                <td>{s.TempatSidang ? (
                  <>{s.TempatSidang}</>
                ) : (
                  <>-</>
                )}</td>
                <td>{s.StatusSkripsi}</td>
                <td><Link onClick={() => {
                  setSelectedSkripsi(s);
                  localStorage.setItem('nim', s.nim);
                  window.location.href = "/updateSidang";
                }
                } className='updateLinkButton'>Update Data</Link></td>
              </tr>
              </>
            ))}
            </>
          )}
        </table>
      </div>
    </div>
  )
}
