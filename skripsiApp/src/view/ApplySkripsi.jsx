import React, { useState, useEffect } from 'react'
import './ApplySkripsi.css'

export const ApplySkripsi = () => {
    const [judul, setJudul] = useState();
    const [topik, setTopik] = useState();
    const [tipe, setTipe] = useState();
    const [file, setFile] = useState();
    const [dosen, setDosen] = useState([]);
    const emailLocal = localStorage.getItem('email');
    const [selectedDosen, setSelectedDosen] = useState();

    const handleSubmitSkripsi = async (e) => {
        e.preventDefault();
        try {
            const skripsiData = {
                Judul: judul,
                Topik: topik,
                Tipe: tipe,
                File: file,
                Dosen: selectedDosen,
                Mahasiswa: emailLocal,
            };
            // console.log('selected = '+ selectedDosen);
            const response = await fetch('http://localhost:3000/api/users/submitSkripsi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(skripsiData),
            });
            window.location.href = "/homeStudent";
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const getAvailableDosenAndStaff = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/users/getAvailableDosenAndStaff', {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          },});
          const result = await response.json();
          console.log('RESULT = ' + result);
          setDosen(result.availableDosen);
          } catch (error) {
          console.error('Error:', error.message);
          }
    }

    const handleChange = (e) => {
        console.log('tes = ' + e.target.value);
        setSelectedDosen(e.target.value);
      }; 

    useEffect(() => {
        getAvailableDosenAndStaff();
    }, []);

  return (
    <div className='applySkripsiPage'>
        <div className="applySkripsiContainer">
            <div className="applySkripsiTitle">
                Apply Skripsi
            </div>
            <div className="applySkripsiContent">
                <form onSubmit={handleSubmitSkripsi}>
                    <div className="applySkripsiInput">
                        <label htmlFor="judul">Judul Skripsi</label>
                        <input type="text" value={judul} onChange={(e)=> setJudul(e.target.value)}required/>
                    </div>
                    <div className="applySkripsiInput">
                        <label htmlFor="topik">Topik Skripsi</label>
                        <input type="text" value={topik} onChange={(e)=> setTopik(e.target.value)}required/>
                    </div>
                    <div className="applySkripsiInput">
                        <label htmlFor="tipe">Tipe Skripsi</label>
                        <input type="text" value={tipe} onChange={(e)=> setTipe(e.target.value)}required/>
                    </div>
                    <div className="applySkripsiInput">
                        <label htmlFor="file">Link File Skripsi</label>
                        <input type="text" value={file} onChange={(e)=> setFile(e.target.value)}required/>
                    </div>
                    <div className="applySkripsiInput">
                        <div className="dropdown-container">
                            <label htmlFor="dropdown" className="dropdown-label">
                                Pilih Dosen Pembimbing/Penguji:
                            </label>
                            <select
                                id="dropdown"
                                className="dropdown"
                                value={selectedDosen}
                                onChange={handleChange}
                            >
                                <option value="">
                                -- Choose an option --
                                </option>
                                {dosen.map((d, index) => (
                                <option key={index} value={d.DosenID}>
                                    {d.Nama}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type='submit'>Submit Skripsi</button>
                </form>
            </div>
        </div>
    </div>
  )
}
