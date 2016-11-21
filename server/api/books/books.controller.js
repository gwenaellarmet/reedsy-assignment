'use strict';

var _ = require('lodash');

// Get list of books
exports.index = function(req, res) {

  var file = require('./books.json');
  res.json(file);
};