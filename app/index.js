'use strict';

var express = require('express');
var app = express();

var morgan = require('morgan');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/checkers', function(req, res){
  res.render('checkers.ejs');
});

app.get('/add/:x/:y', function(req, res){
  req.params.x *= 1;
  req.params.y *= 1;
  req.params.length = 2;
  req.params.isOdd = ((req.params.x + req.params.y) % 2) === 1;
  req.params.fontSize = req.query.fontsize;
  res.render('add.ejs', req.params);
});

app.get('/add/:x/:y/:a/:b', function(req, res){
  console.log(req.params, req.query);
  req.params.x *= 1;
  req.params.y *= 1;
  req.params.a *= 1;
  req.params.b *= 1;
  req.params.length = 4;
  req.params.isOdd = ((req.params.x + req.params.y + req.params.a + req.params.b) % 2) === 1;
  req.params.fontSize = req.query.fontsize;
  req.params.color = req.query.color;
  req.params.bw = req.query.borderwidth;
  res.render('add.ejs', req.params);
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is listening on PORT:', port);
});
