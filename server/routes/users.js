var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

// get all users
router.post('/login', async (req, res, next) => {
  const {Email, Password} = req.body;
  try {
    const roleUser = await mysql.query('SELECT NamaRole FROM user u WHERE u.Email LIKE ? AND u.Password = ?', ['%' + Email + '%', Password]);
    console.log('ROLE = ', roleUser[0][0].NamaRole); 
    if (roleUser && roleUser[0][0].NamaRole.length > 0) {
      console.log('Role: ' + roleUser[0][0].NamaRole);
    } else {
      console.log('No role found for this email');
    }
    res.status(200).json(roleUser[0][0].NamaRole);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);  // Error handling
  }
});

router.post('/registerStudent', async (req, res, next) => {
  const {NIM, Nama, Email, Password, Kampus, DOB, Gender, Alamat, Agama, Jurusan} = req.body;
  try {
    const query1 =
  'INSERT INTO mahasiswa (NIM, Nama, Email, Kampus, TanggalLahir, Gender, Alamat, Agama, Jurusan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const query2 = 'INSERT INTO user (Email, Password, NamaRole) VALUES (?, ?, "Student")';
  await mysql.query(query2, [Email, Password]);
  await mysql.query(query1, [NIM, Nama, Email, Kampus, DOB, Gender, Alamat, Agama, Jurusan]);
    res.status(201).send('Mahasiswa created');
    res.json(result);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);  // Error handling
  }
});

router.post('/registerLecturer', async (req, res, next) => {
  const {DosenID, Nama, Email, Password, Kampus} = req.body;
  try {
  const query1 = 'INSERT INTO dosen (DosenID, Nama, Email, Kampus) VALUES (?, ?, ?, ?)';
  const query2 = 'INSERT INTO user (Email, Password, NamaRole) VALUES (?, ?, "Lecturer")';
  await mysql.query(query2, [Email, Password]);
  await mysql.query(query1, [DosenID, Nama, Email, Kampus]);
    res.status(201).send('Dosen created');
    res.json(result);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/registerStaff', async (req, res, next) => {
  const {StaffID, Nama, Email, Password, Kampus} = req.body;
  try {
  const query1 = 'INSERT INTO staff (StaffID, Nama, Email, Kampus) VALUES (?, ?, ?, ?)';
  const query2 = 'INSERT INTO user (Email, Password, NamaRole) VALUES (?, ?, "Staff")';
  await mysql.query(query2, [Email, Password]);
  await mysql.query(query1, [StaffID, Nama, Email, Kampus]);
    res.status(201).send('Staff created');
    res.json(result);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
