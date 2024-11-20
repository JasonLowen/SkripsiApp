import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Home from './view/Home';
import { Login } from './view/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './view/Register';
import { RegisterStudent } from './view/RegisterStudent';
import { RegisterLecturer } from './view/RegisterLecturer';
import { RegisterStaff } from './view/RegisterStaff';

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
      </Routes>
    </Router>
  );
}

export default App;
