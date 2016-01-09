'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BookmarkSchema = new mongoose.Schema({
  name: String,
  url: String,
  created_at : Date
});

BookmarkSchema.pre('save', function(next){
  var now = new Date();
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

export default mongoose.model('Bookmark', BookmarkSchema);
