'use strict';

var express = require('express');
var app = express();

var morgan = require('morgan');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/checkers', function(req, res){
  res.render('checkers');
});

app.get('/add/:x/:y', function(req, res){
  req.params.x *= 1;
  req.params.y *= 1;
  req.params.length = 2;
  req.params.isOdd = ((req.params.x + req.params.y) % 2) === 1;
  req.params.fontSize = req.query.fontsize;
  res.render('add', req.params);
});

app.get('/add/:x/:y/:a/:b', function(req, res){
  req.params.x *= 1;
  req.params.y *= 1;
  req.params.a *= 1;
  req.params.b *= 1;
  req.params.length = 4;
  req.params.isOdd = ((req.params.x + req.params.y + req.params.a + req.params.b) % 2) === 1;
  req.params.fontSize = req.query.fontsize;
  req.params.color = req.query.color;
  req.params.bw = req.query.borderwidth;
  res.render('add', req.params);
});

app.get('/sumlist/:nums', function(req, res){
  req.params.nums = req.params.nums.split(',').map(function(x){return x * 1;});
  req.params.even = req.query.even;
  req.params.odd = req.query.odd;
  req.params.sum = req.params.nums.reduce(function(a, b){return a + b;});
  res.render('sumlist', req.params);
});

app.get('/rolldice/:roll', function(req, res){
  var roll = req.params.roll * 1;
  var row = Math.ceil(roll / 10);
  var rolls = [];

  for(var i = 0; i < roll; i++){
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  var sum = rolls.reduce(function(a,b){return a + b;});
  res.render('rolldice', {rolls:rolls,row:row,sum:sum});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is listening on PORT:', port);
});
