'use strict';

const EXPRESS = require('express');
const PG = require('pg');
const BPS = require('body-parser');
const APP = EXPRESS();
const PORT = process.env.PORT || 3000;
const db_location = process.env.DATABASE_URL || 'pstgress://localhost:5432/groceries';
const CLIENT = new PG.Client(db_location)
CLIENT.conect();
APP.use(EXPRESS.static('public'));
APP.use(BPS.json());
APP.use(BPS.urlencoded({extended: true}));

APP.get('/', function(request, response){
  response.sendFiles('index.html', {root: './public'});
});

CLIENT.query(`CREATE TABLE IF NOT EXISTS invetory (id SERIAL PRIMARY KEY, name VARCHAR(100) UNIQUE, category VARCHAR(100), price DOUBLE PRECISION, quatity INTERGER)`)

APP.post('/inventory', function(request, response){
  CLIENT.query(`INSERT INTO inventory (name, category, price, quantity INTERGER) VALUE ($1, $2, $3, $4, $5`,
    [
      request.body.name,
      request.body.category,
      request.body.price,
      request.body.quantity,
    ]);
    .then(function(){
      response.send(`Inventory Updated`);
    });
    .catch(function(err){
      console.error(err);
      res.status(400).send('something was wrong with request sent');
    });
});




APP.listen(PORT, function(){`You are on port ${PORT}`});
