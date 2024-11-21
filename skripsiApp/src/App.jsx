import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Login } from './view/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './view/Register';
import { RegisterStudent } from './view/RegisterStudent';
import { RegisterLecturer } from './view/RegisterLecturer';
import { RegisterStaff } from './view/RegisterStaff';
import { HomeStudent } from './view/HomeStudent';
import { HomeLecturer } from './view/HomeLecturer';
import { HomeStaff } from './view/HomeStaff';
import { ApplySkripsi } from './view/ApplySkripsi';
import { UpdateSidang } from './view/UpdateSidang';

function App() {
  // const [data, setData] = useState();

  // const getData = async () => {
  //   const response = await axios.get("http://localhost:5000/getData");
  //   setData(response.data);
  // }

  // useEffect(() => {
  //   getData()
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />} />
        <Route path='/registerStudent' element={<RegisterStudent />} />
        <Route path='/registerLecturer' element={<RegisterLecturer />} />
        <Route path='/registerStaff' element={<RegisterStaff />} />
        <Route path='/homeStudent' element={<HomeStudent />} />
        <Route path='/homeLecturer' element={<HomeLecturer />} />
        <Route path='/homeStaff' element={<HomeStaff />} />
        <Route path='/applySkripsi' element={<ApplySkripsi />} />
        <Route path='/updateSidang' element={<UpdateSidang />} />
      </Routes>
    </Router>
  );
}

export default App;
