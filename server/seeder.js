var express = require('express');
var mysql = require('./mysql');

async function run(){
    try {
        await mysql.query(
            `DROP TABLE IF EXISTS skripsi`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS dosen`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS mahasiswa`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS staff`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS user`
        );
        console.log("Refresh Database");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS user (
                Email VARCHAR(255) PRIMARY KEY,
                Password VARCHAR(255) NOT NULL,
                NamaRole VARCHAR(50) NOT NULL
            )`
        );
        console.log("User table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS dosen (
                DosenID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                Kampus VARCHAR(255) NOT NULL,
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
        );
        console.log("Dosen table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS mahasiswa (
                NIM VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL UNIQUE,
                Kampus VARCHAR(50),
                TanggalLahir DATE,
                Gender VARCHAR(30),
                Alamat VARCHAR(255),
                Agama VARCHAR(50),
                Jurusan VARCHAR(255),
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
        );
        console.log("Mahasiswa table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS staff (
                StaffID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL UNIQUE,
                Kampus VARCHAR(50),
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
        );
        console.log("Staff table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS skripsi (
                ID INT PRIMARY KEY AUTO_INCREMENT,
                nim VARCHAR(255) NOT NULL,
                dosenID VARCHAR(255) NOT NULL,
                staffID VARCHAR(255) NOT NULL,
                JudulSkripsi VARCHAR(255),
                TopikSkripsi VARCHAR(255),
                TipeSkripsi VARCHAR(255),
                FileSkripsi VARCHAR(255),
                StatusSkripsi VARCHAR(255),
                TanggalSidang DATE,
                FOREIGN KEY (nim) REFERENCES mahasiswa(NIM) ON DELETE CASCADE,
                FOREIGN KEY (dosenID) REFERENCES dosen(DosenID) ON DELETE CASCADE,
                FOREIGN KEY (staffID) REFERENCES staff(StaffID) ON DELETE CASCADE
            )`
        );
        console.log("Skripsi table created");

        await mysql.query(
            `INSERT INTO user (Email, Password, NamaRole)
            VALUES
            ('agus.santoso@gmail.com', '2$x#f3!lKQ', 'Lecturer'),
            ('hadi.pranoto@gmail.com', 'ab!wX3rTq9', 'Lecturer'),
            ('tri.wahyuni@gmail.com', 'Y9p@2LzMc#', 'Lecturer'),
            ('bambang.sutrisno@gmail.com', 'k$Tf8E3#A!', 'Lecturer'),
            ('lina.hartati@gmail.com', 'p$Q9!rTxM#', 'Lecturer'),
            ('erwin.nugroho@gmail.com', 'jQ!8$zXwL#', 'Lecturer'),
            ('siti.maesaroh@gmail.com', 'bTx!@W2z#9', 'Lecturer'),
            ('putri.utami@gmail.com', '9z@f$PqQ3!M', 'Lecturer'),
            ('rizki.ramadhan@studentmail.com', 'aZ3x$Pq9!T', 'Student'),
            ('indah.permata@studentmail.com', 'jE9!PqW@L3$', 'Student'),
            ('dimas.pratama@studentmail.com', 'xZ!M9wPq#2$', 'Student'),
            ('lidya.azizah@studentmail.com', '3$R!9fTxW@p', 'Student'),
            ('faisal.nugraha@studentmail.com', 'zW@XfL9#Pq!', 'Student'),
            ('annisa.lestari@studentmail.com', 'L$P9@zTxQ!3', 'Student'),
            ('rifqi.hakim@studentmail.com', '3xQ$PzTf!W9', 'Student'),
            ('siti.zubaidah@studentmail.com', 'R$9zPqQW3!T', 'Student'),
            ('adi.wirawan@studentmail.com', 'LQ@!3$9RzfT', 'Student'),
            ('tina.safitri@studentmail.com', 'M@3$X!fTp9z', 'Student'),
            ('andi.santoso@univmail.com', 'R@2$PqTzX!9', 'Staff'),
            ('susan.pratiwi@univmail.com', 'Tz!M9$XW@3p', 'Staff'),
            ('budi.hartono@univmail.com', '9x!3RzL$TpQ', 'Staff'),
            ('nova.setiawan@univmail.com', 'Tf$L9W@z!X3', 'Staff'),
            ('fajar.maulana@univmail.com', 'Wz9!$LxTQp@', 'Staff'),
            ('sri.kartini@univmail.com', 'Pq9!T$LXz@3', 'Staff'),
            ('doni.pratama@univmail.com', 'PzT9$Q!xW@3', 'Staff'),
            ('irma.lestari@univmail.com', '9@QzP$TWx3!', 'Staff'),
            ('david.hutomo@univmail.com', '9$z@!PXWQ3T', 'Staff'),
            ('nina.kusuma@univmail.com', 'TQ!9$PxWzL3', 'Staff')`
        );
        
        console.log("User data inserted");

        await mysql.query(
            `INSERT INTO dosen (DosenID, Nama, Email, Kampus)
            VALUES
            ('D4821', 'Dr. Agus Santoso', 'agus.santoso@gmail.com', 'Kampus A'),
            ('D7610', 'Prof. Hadi Pranoto', 'hadi.pranoto@gmail.com', 'Kampus B'),
            ('D2348', 'Dr. Tri Wahyuni', 'tri.wahyuni@gmail.com', 'Kampus A'),
            ('D5937', 'Dr. Bambang Sutrisno', 'bambang.sutrisno@gmail.com', 'Kampus C'),
            ('D8094', 'Prof. Lina Hartati', 'lina.hartati@gmail.com', 'Kampus A'),
            ('D4562', 'Dr. Erwin Nugroho', 'erwin.nugroho@gmail.com', 'Kampus B'),
            ('D2719', 'Dr. Siti Maesaroh', 'siti.maesaroh@gmail.com', 'Kampus D'),
            ('D9403', 'Dr. Putri Utami', 'putri.utami@gmail.com', 'Kampus C')`
        );
        
        console.log("Dosen data inserted");
        
        await mysql.query(
            `INSERT INTO mahasiswa (NIM, Nama, Email, Kampus, TanggalLahir, Gender, Alamat, Agama, Jurusan)
            VALUES
            ('2602348593', 'Rizki Ramadhan', 'rizki.ramadhan@studentmail.com', 'Kampus A', '1995-15-03', 'Laki-laki', 'Jalan A', 'Islam', 'Jurusan A'),
            ('2602671048', 'Indah Permata Sari', 'indah.permata@studentmail.com', 'Kampus B', '2000-12-07', 'Perempuan', 'Jalan B', 'Kristen', 'Jurusan B'),
            ('2602176395', 'Dimas Pratama', 'dimas.pratama@studentmail.com', 'Kampus A', '1998-25-09', 'Laki-laki', 'Jalan C', 'Hindu', 'Jurusan C'),
            ('2602849012', 'Lidya Nur Azizah', 'lidya.azizah@studentmail.com', 'Kampus B', '1997-05-02', 'Perempuan', 'Jalan D', 'Islam', 'Jurusan D'),
            ('2602923476', 'Faisal Nugraha', 'faisal.nugraha@studentmail.com', 'Kampus C', '2001-19-11', 'Laki-laki', 'Jalan E', 'Buddha', 'Jurusan A'),
            ('2602348760', 'Annisa Lestari', 'annisa.lestari@studentmail.com', 'Kampus A', '1996-08-04', 'Perempuan', 'Jalan F', 'Kristen', 'Jurusan B'),
            ('2602990043', 'Rifqi Hakim', 'rifqi.hakim@studentmail.com', 'Kampus D', '1999-21-06', 'Laki-laki', 'Jalan G', 'Islam', 'Jurusan C'),
            ('2602143987', 'Siti Zubaidah', 'siti.zubaidah@studentmail.com', 'Kampus B', '2002-13-01', 'Perempuan', 'Jalan H', 'Hindu', 'Jurusan D'),
            ('2602726184', 'Adi Wirawan', 'adi.wirawan@studentmail.com', 'Kampus C', '1994-30-08', 'Laki-laki', 'Jalan I', 'Buddha', 'Jurusan E'),
            ('2602607831', 'Tina Safitri', 'tina.safitri@studentmail.com', 'Kampus A', '2003-17-10', 'Perempuan', 'Jalan J', 'Kristen', 'Jurusan F')`
        );
        
        console.log("Mahasiswa data inserted");
        
        await mysql.query(
            `INSERT INTO staff (StaffID, Nama, Email, Kampus)
            VALUES
            ('S4832', 'Andi Santoso', 'andi.santoso@univmail.com', 'Kampus A'),
            ('S7619', 'Susan Pratiwi', 'susan.pratiwi@univmail.com', 'Kampus B'),
            ('S3950', 'Budi Hartono', 'budi.hartono@univmail.com', 'Kampus A'),
            ('S2408', 'Nova Setiawan', 'nova.setiawan@univmail.com', 'Kampus C'),
            ('S8724', 'Fajar Maulana', 'fajar.maulana@univmail.com', 'Kampus D'),
            ('S5371', 'Sri Kartini', 'sri.kartini@univmail.com', 'Kampus A'),
            ('S6490', 'Doni Pratama', 'doni.pratama@univmail.com', 'Kampus B'),
            ('S8293', 'Irma Lestari', 'irma.lestari@univmail.com', 'Kampus D'),
            ('S1027', 'David Hutomo', 'david.hutomo@univmail.com', 'Kampus C'),
            ('S3476', 'Nina Kusuma', 'nina.kusuma@univmail.com', 'Kampus A')`
        );
        
        console.log("Staff data inserted");
        
        await mysql.query(
            `INSERT INTO skripsi (nim, dosenID, staffID, JudulSkripsi, TopikSkripsi, TipeSkripsi, StatusSkripsi, FileSkripsi, TanggalSidang)
            VALUES
            ('2602348593', 'D4821', 'S4832', 'Impact of AI on Education', 'Artificial Intelligence', 'Quantitative Research', 'Pending', '/images/skripsi1.pdf', '2025-02-16'),
            ('2602671048', 'D7610', 'S7619', 'Renewable Energy in Indonesia', 'Renewable Energy', 'Qualitative Research', 'Accepted', '/images/skripsi2.pdf', '2024-11-18'),
            ('2602176395', 'D2348', 'S3950', 'Digital Marketing Strategies', 'Digital Marketing', 'Descriptive Study', 'Scheduled', '/images/skripsi3.pdf', '2020-09-22'),
            ('2602849012', 'D5937', 'S2408', 'Blockchain for Transparency', 'Blockchain Technology', 'Case Study', 'Accepted', '/images/skripsi4.pdf', '2021-04-02'),
            ('2602923476', 'D8094', 'S8724', 'Remote Work Culture Analysis', 'Workplace Culture', 'Comparative Analysis', 'Pending', '/images/skripsi5.pdf', '2025-08-11'),
            ('2602348760', 'D4562', 'S5371', 'Advancing Healthcare Systems', 'Healthcare Systems', 'Experimental Study', 'Pending', '/images/skripsi6.pdf', '2022-07-09'),
            ('2602990043', 'D2719', 'S6490', 'Cybersecurity Trends 2024', 'Cybersecurity', 'Correlational Study', 'Scheduled', '/images/skripsi7.pdf', '2024-08-30'),
            ('2602143987', 'D9403', 'S8293', 'Climate Change Adaptation', 'Climate Science', 'Survey Research', 'Pending', '/images/skripsi8.pdf', '2022-01-17'),
            ('2602726184', 'D2348', 'S1027', 'Mobile App Usability Study', 'Mobile Applications', 'Action Research', 'Accepted', '/images/skripsi9.pdf', '2024-11-03'),
            ('2602607831', 'D5937', 'S3476', 'AI-Powered Language Learning', 'Educational Technologies', 'Historical Analysis', 'Scheduled', '/images/skripsi10.pdf', '2022-06-27')`
        );
        
        console.log("Skripsi data inserted");
    } catch (err) {
        console.log(err);
    }
}

module.exports = run;