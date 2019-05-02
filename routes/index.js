var mongoose = require('mongoose')
var Admin = mongoose.mongo.Admin;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// localhost:27017/checkdb/testdb

router.get('/checkdb/:dbname', function (req, res, next) {

  const url = 'mongodb://viram:123@localhost:27017/';

  var dbname = req.params.dbname;
  console.log('passed db name:' + dbname);

  // create a connection to the DB    
  var connection = mongoose.createConnection(url);

  connection.on('open', function () {
    // connection established
    new Admin(connection.db).listDatabases(function (err, result) {
      console.log('listDatabases succeeded');
      // database list stored in result.databases
      var allDatabases = result.databases;

      let dbExists = false;
      allDatabases.forEach(function (db) {
        if (db.name == dbname) {
          dbExists = true;
        }
      });
      
      res.json({ dbexists : dbExists });
      return;

    });

    

  });

  
});

module.exports = router;
