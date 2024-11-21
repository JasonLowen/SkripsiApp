var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

// get all users
router.post('/login', async (req, res, next) => {
  const {Email, Password} = req.body;
  try {
    const roleUser = await mysql.query('SELECT NamaRole FROM user u WHERE u.Email = ? AND u.Password = ?', [Email, Password]);
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
    const query2 = 'INSERT INTO user (Email, Password, NamaRole) VALUES (?, ?, ?)';
    await mysql.query(query2, [Email, Password, "Student"]);
    
    const query1 = 'INSERT INTO mahasiswa (NIM, Nama, Email, Kampus, TanggalLahir, Gender, Alamat, Agama, Jurusan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await mysql.query(query1, [NIM, Nama, Email, Kampus, DOB, Gender, Alamat, Agama, Jurusan]);
    res.status(200).send('Mahasiswa created');
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

router.post('/checkStudentThesis', async (req, res, next) => {
  const { Email } = req.body;
  try {
    const query1 = `
      SELECT * 
      FROM mahasiswa m
      JOIN user u ON m.Email = u.Email
      JOIN skripsi s ON s.nim = m.NIM
      WHERE m.Email = ?
    `;
    const result = await mysql.query(query1, [Email]);
    const resultSkripsi = result[0][0];
    if (resultSkripsi && resultSkripsi.dosenID != undefined && resultSkripsi.dosenID != null && resultSkripsi.dosenID !== '') {
      try {
        const dosenName = await mysql.query(`SELECT Nama FROM dosen WHERE DosenID = ?`, [resultSkripsi.dosenID]);
        if (dosenName && dosenName[0] && dosenName[0][0]) {
          resultSkripsi.dosenID = dosenName[0][0].Nama;
        }
      } catch (err) {
        console.error('Error fetching Dosen:', err);
      }
    }
    
    if (resultSkripsi && resultSkripsi.staffID != undefined && resultSkripsi.staffID != null && resultSkripsi.staffID !== '') {
      try {
        const staffName = await mysql.query(`SELECT Nama FROM staff WHERE StaffID = ?`, [resultSkripsi.staffID]);
        if (staffName && staffName[0] && staffName[0][0]) {
          resultSkripsi.staffID = staffName[0][0].Nama;
        }
      } catch (err) {
        console.error('Error fetching Staff:', err);
      }
    }
    console.log('Query Result:', resultSkripsi);

    if (result[0] && result[0].length > 0) {
      res.status(200).json({ thesisExists: true, data: resultSkripsi });
    } else {
      res.status(200).json({ thesisExists: false });
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/checkLecturerThesis', async (req, res, next) => {
  const { Email } = req.body;
  try {
    const query1 = `
      SELECT * 
      FROM dosen d
      JOIN user u ON d.Email = u.Email
      JOIN skripsi s ON s.dosenID = d.DosenID
      WHERE u.Email = ?
    `;
    const result = await mysql.query(query1, [Email]);
    const resultSkripsi = result[0][0];

    if (resultSkripsi && resultSkripsi.dosenID != undefined && resultSkripsi.dosenID != null && resultSkripsi.dosenID !== '') {
      try {
        const dosenName = await mysql.query(`SELECT Nama FROM dosen WHERE DosenID = ?`, [resultSkripsi.dosenID]);
        if (dosenName && dosenName[0] && dosenName[0][0]) {
          resultSkripsi.dosenID = dosenName[0][0].Nama;
        }
      } catch (err) {
        console.error('Error fetching Dosen:', err);
      }
    }
    if (resultSkripsi && resultSkripsi.staffID != undefined && resultSkripsi.staffID != null && resultSkripsi.staffID !== '') {
      try {
        const staffName = await mysql.query(`SELECT Nama FROM staff WHERE StaffID = ?`, [resultSkripsi.staffID]);
        if (staffName && staffName[0] && staffName[0][0]) {
          resultSkripsi.staffID = staffName[0][0].Nama;
        }
      } catch (err) {
        console.error('Error fetching Staff:', err);
      }
    }
    console.log('Query Result:', resultSkripsi);

    if (result[0] && result[0].length > 0) {
      res.status(200).json({ thesisExists: true, data: resultSkripsi });
    } else {
      res.status(200).json({ thesisExists: false });
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/checkStaffThesis', async (req, res, next) => {
  const { Email } = req.body;
  try {
    const query1 = `
      SELECT * 
      FROM skripsi
    `;
    const result = await mysql.query(query1, []);
    const resultSkripsi = result[0];

    for(let i = 0; i < resultSkripsi.length; i++){
      const dosenName = await mysql.query(`SELECT Nama FROM dosen WHERE DosenID = ?`, [resultSkripsi[i].dosenID]);
      const staffName = await mysql.query(`SELECT Nama FROM staff WHERE StaffID = ?`, [resultSkripsi[i].staffID]);
      const studentName = await mysql.query(`SELECT Nama FROM mahasiswa WHERE NIM = ?`, [resultSkripsi[i].nim]);

      if (dosenName && dosenName[0] && dosenName[0][0] && dosenName[0][0].Nama){
        resultSkripsi[i].dosenID = dosenName[0][0].Nama;
      }
      if (staffName && staffName[0] && staffName[0][0] && staffName[0][0].Nama){
        resultSkripsi[i].staffID = staffName[0][0].Nama;
      }
      // if (studentName && studentName[0] && studentName[0][0] && studentName[0][0].Nama){
      //   resultSkripsi[i].nim = studentName[0][0].Nama;
      // }
    }
    console.log('Query Result:', resultSkripsi);

    if (result[0] && result[0].length > 0) {
      res.status(200).json({ thesisExists: true, data: resultSkripsi });
    } else {
      res.status(200).json({ thesisExists: false });
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/submitSkripsi', async (req, res, next) => {
  const { Judul, Topik, Tipe, File, Dosen, Mahasiswa } = req.body;
  console.log('tes');
  console.log('DOSEN = ' + Dosen);
  try {
    const query1 =
      'INSERT INTO skripsi (JudulSkripsi, TopikSkripsi, TipeSkripsi, FileSkripsi, DosenID, nim, StatusSkripsi) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    const mahasiswa = await mysql.query(
      'SELECT NIM FROM mahasiswa m JOIN user u ON m.Email = u.Email WHERE m.Email = ?',
      [Mahasiswa]
    );

    if (mahasiswa.length === 0) {
      throw new Error("No mahasiswa found for the given email.");
    }

    const mahasiswaNIM = mahasiswa[0][0].NIM;
    console.log('MAHASISWA NIM = ' + mahasiswaNIM);

    await mysql.query(query1, [
      Judul,
      Topik,
      Tipe,
      File,
      Dosen,
      mahasiswaNIM,
      "Pending",
    ]);

    res.status(200).send('Skripsi submitted');
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send(err.message);
  }
});

router.get('/getAvailableDosenAndStaff', async (req, res) => {
  try {
      const [dosenSkripsi] = await mysql.query(
          `SELECT DISTINCT dosenID FROM skripsi`
      );

      const dosenSkripsiID = dosenSkripsi.map(item => item.dosenID);

      let query = 'SELECT DosenID, Nama FROM dosen';
      if (dosenSkripsiID.length > 0) {
          query += ` WHERE DosenID NOT IN (${dosenSkripsiID.map(id => `'${id}'`).join(',')})`;
      }

      const [availableDosen] = await mysql.query(query);

      const [staff] = await mysql.query('SELECT StaffID, Nama FROM staff ORDER BY RAND() LIMIT 1');

      if (!availableDosen.length) {
          return res.status(404).send('No available dosen found');
      }
      if (!staff.length) {
          return res.status(404).send('No staff found');
      }

      res.status(200).json({ availableDosen, staff: staff[0] });
  } catch (err) {
      console.error('Error fetching dosen and staff:', err.message);
      res.status(500).send('Error fetching available dosen and staff');
  }
});

router.post('/handleThesisAccept', async (req, res, next) => {
  const {Email, Command, Mahasiswa} = req.body;
  try {
  const selectedDosen = await mysql.query('SELECT * FROM dosen d JOIN user u ON d.Email = u.Email WHERE d.Email = ?', [Email]);
  const dosen = selectedDosen[0][0];
  if (Command == "Accept"){
    await mysql.query('UPDATE skripsi SET dosenID = ?, StatusSkripsi = ? WHERE nim = ?', [dosen.DosenID, "Accepted", Mahasiswa]);
    res.status(200).send('Thesis accepted');
  }
  else if (Command == "Decline"){
    await mysql.query('DELETE FROM skripsi WHERE nim = ?', [Mahasiswa]);
    res.status(200).send('Thesis declined');
  }
    res.json(dosen);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

router.post('/updateSidang', async (req, res, next) => {
  const {NIM, TanggalSidang, TempatSidang, Email} = req.body;
  try {
    const staff = await mysql.query('SELECT * FROM staff WHERE Email = ?', [Email]);
    await mysql.query('UPDATE skripsi SET TanggalSidang = ?, TempatSidang = ?, staffID = ?, StatusSkripsi = ? WHERE NIM = ?', [TanggalSidang, TempatSidang, staff[0][0].StaffID, "Scheduled", NIM]);
    res.status(200).send('Data Sidang Updated');
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
