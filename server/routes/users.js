var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

router.get('/users', async (req, res, next) => {
  try {
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    res.json(rows); // Send the result as a JSON response
  } catch (err) {
    next(err); // Handle error
  }
  console.log('tes');
});

module.exports = router;
