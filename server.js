'use strict';

const EXPRESS = require('express');
const PG = require('pg');
const BPS = require('body-parser');
const APP = EXPRESS();
const PORT = process.env.PORT || 3000;

APP.use(EXPRESS.static('public'));

APP.listen(PORT, function(){`You are on port ${PORT}`});
