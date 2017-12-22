var express = require('express');
var app = express();

const testFolder = './kml-files/';
const fs = require('fs-readdir-promise');
var fileName = [];
var j=0;

fs(testFolder)
	.then(function(files) {
  		files.forEach(file => {
    		fileName[j++] = file;
		})
	})
	.catch(function(err) {
  		console.log(err.message);
	});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/', function(req,res) {
	res.send(fileName);
});

app.listen('3000', function() {
	console.log('Running on port 3000');
});