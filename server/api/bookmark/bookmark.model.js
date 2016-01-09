'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BookmarkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  created_at : { type: Date}
});

BookmarkSchema.pre('save', function(next){
  var now = new Date();
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

export default mongoose.model('Bookmark', BookmarkSchema);
