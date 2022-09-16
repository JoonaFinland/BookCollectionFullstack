const express = require('express');
const bodyParser = require('body-parser');
const { MopedOutlined } = require('@mui/icons-material');
const route = require('./routes');
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', route);

// Uncomment to simulate load times, see the nice loading animations :) 
//app.use(function(req,res,next){setTimeout(next,1000)});

module.exports = app